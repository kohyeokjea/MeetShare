import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginToggle from "../assets/images/login_toggle.png";
import logoutToggle from "../assets/images/logout_toggle.png";
import { useAuthStore } from "../hooks/useAuthStore";

const Header = () => {
  // 토큰 받아오기
  // const param = new URLSearchParams(window.location.search);
  // const token = param.get("token");

  // if (token) {
  //   localStorage.clear(); // 기존 토큰 삭제
  //   localStorage.setItem("token", token); // 토큰 저장
  // }

  const navigate = useNavigate();

  // 로그인 상태 저장
  const { loginFlag, setLoginFlag } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoginFlag(true); // 로그인
    } else {
      setLoginFlag(false); // 비로그인
    }
  }, [setLoginFlag]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/user/logout", null, {
        withCredentials: true, // 세션, 쿠키, 인증 정보 포함 요청
      });
      localStorage.removeItem("token");
      setLoginFlag(false);
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="h-[90px] p-4 bg-white text-[#000] border-b-[1px] border-b-[#000] flex items-center justify-center">
      <div className="w-[1400px] flex items-center justify-between">
        <h1 className="text-[25px] font-semibold">MeetShare</h1>
        <ul className="flex">
          {loginFlag ? (
            <>
              <li onClick={() => navigate(`/myPage`)} className="text-[#3600ff] font-bold hover:text-[#d9006b] cursor-pointer pr-3">
                <span>마이페이지</span>
              </li>
              <span className="text-[#5c5c5c]">|</span>
              <li className="flex items-center hover:text-[#d9006b] cursor-pointer pl-3">
                <img src={logoutToggle} alt="로그아웃 토글" />
                <button onClick={handleLogout}>
                  <span className="ml-[5px] font-semibold">로그아웃</span>
                </button>
              </li>
            </>
          ) : (
            <li className="flex items-center hover:text-[#d9006b] cursor-pointer">
              <img src={loginToggle} alt="로그인 토글" />
              <button>
                <span className="ml-[5px] font-semibold">로그인</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
