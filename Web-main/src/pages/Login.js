import React from "react";
import naverIcon from "../assets/images/naver_icon.png";
import kakaoIcon from "../assets/images/kakao_icon.png";

function Login() {
  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[800px] custom-bg1">
      <div className="bg-white p-8 w-full max-w-[450px] h-[300px] flex flex-col justify-center items-center relative border-[1px] border-[#000] rounded-[10px]">
        <p className="font-medium text-[20px] text-[#000] text-center relative z-10 inline-block custom-underline1">
          로그인 방법을 선택해주세요.
        </p>
        <div className="mt-6">
          <div>
            <button onClick={handleNaverLogin}
              className="flex items-center justify-center w-[310px] h-[50px]
              bg-[#03c75a] mb-[5px] rounded-[100px]">
              <img
                src={naverIcon}
                alt="네이버 로그인 아이콘"
                className="w-[45px]"
              />
              <span className="font-semibold text-white">네이버 로그인</span>
            </button>
            <button
              onClick={handleKakaoLogin}
              className="flex items-center justify-center w-[310px] h-[50px] bg-[#fddc3f] rounded-[100px]"
            >
              <img
                src={kakaoIcon}
                alt="카카오 로그인 아이콘"
                className="w-[45px]"
              />
              <span className="font-semibold">카카오 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
