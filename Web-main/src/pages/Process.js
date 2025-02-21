import React, { useEffect } from "react";

// 로그인 후, 메인으로 이동하기 전 토큰 저장하는 페이지
function Process() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.clear(); // 기존 토큰 삭제
      localStorage.setItem("token", token);
      window.location.href = "http://localhost:3000/calMain";
    }
  }, []);

  return <div>로그인 처리 중...</div>;
}

export default Process;
