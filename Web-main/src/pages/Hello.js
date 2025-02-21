// 리액트 연동 테스트 페이지 -> 마지막에 삭제할 예정
import React, { useEffect, useState } from "react";
import axios from "axios";

function Hello() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/hello")
      .then((response) => {
        setMessage(response.data); // 서버로부터 받은 데이터 저장
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>React & Spring Boot Communication</h1>
      <p>{message}</p> {/* 서버에서 받은 메시지 표시 */}
    </div>
  );
}

export default Hello;
