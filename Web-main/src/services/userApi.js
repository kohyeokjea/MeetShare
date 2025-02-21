import axios from "axios";

const BASE_URL = "http://localhost:8080"; // default url 설정
const token = localStorage.getItem("token"); // jwt 토큰 추출

// 회원탈퇴
export const withdraw = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/withdraw`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // for 세션 공유
    });
    return response.data;
  } catch (error) {
    console.error("캘린더 목록 불러오기 오류:", error);
    throw error;
  }
};
