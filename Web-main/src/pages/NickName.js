import React, { useState } from "react";
import pencil from "../assets/images/pencil.png";
import { updateCalMberNickname } from "../services/calApi";

// 닉네임 입력화면
function NickName() {
  // 쿼리 파라미터에서 no 가져오기
  const params = new URLSearchParams(window.location.search);
  const calNo = params.get("calNo");

  const [nickname, setNickname] = useState("");

  // submit 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      await updateCalMberNickname(calNo, nickname);
      window.location.href = "http://localhost:3000/todoMain?calNo=" + calNo;
    } catch (error) {
      console.error("캘린더 목록 로드 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[800px]">
      <div className="bg-[#eef1fa] p-8 w-full max-w-[450px] h-[300px] flex flex-col justify-center items-center relative rounded-[10px] custom-icon-password">
        <img src={pencil} alt="연필" className="w-[55px]"/>
        <p className="font-semibold text-[20px] text-[#000] text-center mt-4">
          닉네임을 입력해주세요.
        </p>
        <form onSubmit={handleSubmit}>
          <ul className="mt-6">
            <li>
              <input
                type="text"
                name="nickname"
                onChange={(e) => setNickname(e.target.value)}
                className="border-0 border-b-[#000] border-b-[4px] focus:ring-[#000] focus:border-[#000] w-[200px] h-[45px] text-[18px] text-[#000] text-center bg-transparent placeholder:text-[#000]"
              />
            </li>
          </ul>
          <div className="mt-6 text-[18px] font-semibold flex justify-center">
            <button className="w-[85px] h-[45px] bg-[#90a3ff] mr-1">
              <span>목록</span>
            </button>
            <button type="submit" className="w-[85px] h-[45px] bg-[#000]">
              <span className="text-white">확인</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NickName;
