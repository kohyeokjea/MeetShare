import axios from "axios";

const BASE_URL = "http://localhost:8080"; // default url 설정
const token = localStorage.getItem("token"); // jwt 토큰 추출

// 일정 select
export const fetchTodo = async (no) => {
  try {
    const response = await axios.get(`${BASE_URL}/todo/list/${no}`, {
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

// 일정 view
export const getTodoByNo = async (no) => {
  try {
    const response = await axios.get(`${BASE_URL}/todo/getTodoByNo/${no}`, {
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

// 일정 insert
export const createTodo = async (no, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/todo/insert/${no}`, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // for 세션 공유
    });
    return response.data;
  } catch (error) {
    console.error("캘린더 등록 오류:", error);
    throw error;
  }
};

// 일정 modify
export const updateTodo = async (no, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/todo/update/${no}`, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // for 세션 공유
    });
    return response.data;
  } catch (error) {
    console.error("캘린더 수정 오류:", error);
    throw error;
  }
};

// 일정 delete
export const deleteTodo = async (no) => {
  try {
    const response = await axios.delete(`${BASE_URL}/todo/delete/${no}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // for 세션 공유
    });
    return response.data;
  } catch (error) {
    console.error("캘린더 삭제 오류:", error);
    throw error;
  }
};

// 일정 상단 고정/해제 -> 에러 해결중... -> Security에 인증문제 계속발생
export const updateOrder = async (no) => {
  try {
    console.log("token >>>>>>>>>>" + token);
    const response = await axios.put(`${BASE_URL}/todo/togglePin/${no}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // for 세션 공유
    });
    return response.data;
  } catch (error) {
    console.error("캘린더 고정/해제 오류:", error);
    throw error;
  }
};
