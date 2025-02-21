import axios from "axios";

// Axios 인스턴스 설정 -> for 서버 통신
const apiClient = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버 URL
  withCredentials: true, // cookie 포함 세션 유지
});

export default apiClient;