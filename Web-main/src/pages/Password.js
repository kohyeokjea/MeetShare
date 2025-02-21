import React, { useState } from "react";
import password from "../assets/images/password.png";
// api import
import {joinCalendar} from "../services/calApi";

// 비밀번호 입력화면
function Password() {
  // 쿼리 파라미터에서 no 가져오기
  const params = new URLSearchParams(window.location.search);
  const calNo = params.get("calNo");

  const [passwd, setPasswd] = useState("");

  // submit 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwd) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await joinCalendar(calNo, passwd);
      window.location.href = "http://localhost:3000/calMain";
    } catch (error) {
      console.error("캘린더 목록 로드 실패:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[800px]">
      <div className="bg-[#eef1fa] p-8 w-full max-w-[450px] h-[300px] flex flex-col justify-center items-center relative rounded-[10px] custom-icon-password">
        <img src={password} alt="비밀번호" />
        <p className="font-semibold text-[20px] text-[#000] text-center mt-4">
          비밀번호를 입력해주세요.
        </p>
        <form onSubmit={handleSubmit}>
        <ul className="mt-6">
          <li>
            <input
              type="password"
              name="passwd"
              onChange={(e) => setPasswd(e.target.value)}
              className="border-0 border-b-[4px] border-[#000] focus:ring-[#000] focus:border-[#000] w-[200px] h-[45px] text-[18px] text-[#000] text-center bg-transparent placeholder:text-[#000]"
              placeholder="*****"
            />
          </li>
        </ul>
        <div className="mt-6 text-[18px] font-semibold flex justify-center">
          <button className="w-[85px] h-[45px] bg-[#90a3ff] mr-1">
            <span>목록</span>
          </button>
          <button className="w-[85px] h-[45px] bg-[#000]">
            <span className="text-white">확인</span>
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Password;
