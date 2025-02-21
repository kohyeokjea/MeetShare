import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

// 로그인 인증 상태 확인 훅
// 서버에 요청 -> 로그인 확인
function useAuthCheck() {
  const { setAuthenticated, setUnauthenticated } = useAuthStore();

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:8080/user/checkAuth", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setAuthenticated(); // 로그인
        } else {
          setUnauthenticated(); // 비로그인
        }
      } catch (error) {
        setUnauthenticated();
      }
    }

    checkAuthStatus();
  }, [setAuthenticated, setUnauthenticated]);
}

export default useAuthCheck;
