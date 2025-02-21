import axios from "axios";

const BASE_URL = "http://localhost:8080"; // default url 설정
const token = localStorage.getItem("token"); // jwt 토큰 추출

// 캘린더 select
export const fetchCalendar = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/calendar/list`, {
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

// 캘린더 insert
export const createCalendar = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/calendar/insert`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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

// 캘린더 modify
export const updateCalendar = async (no, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/calendar/update/${no}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    return response.data;
  } catch (error) {
    console.error("캘린더 수정 오류:", error);
    throw error;
  }
};

// 캘린더 delete
export const deleteCalendar = async (no) => {
  try {
    const response = await axios.delete(`${BASE_URL}/calendar/delete/${no}`, {
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

// 초대링크 -> 비밀번호 확인
export const joinCalendar = async (no, passwd) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/calendar/join/${no}`,
      { passwd },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    return response.data;
  } catch (error) {
    console.error("캘린더 입장 오류:", error);
    throw error;
  }
};

/**
 * 캘린더 멤버 관련 api
 */

// 캘린더 멤버 정보 select
export const checkInfo = async (no) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/calendarMber/checkCalMberInfo/${no}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    const url = response.data.url;
    window.location.href = url;
  } catch (error) {
    console.error("캘린더 입장 오류:", error);
    throw error;
  }
};

// 캘린더 멤버 닉네임 update
export const updateCalMberNickname = async (no, nickname) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/calendarMber/updateCalMberNickname/${no}`,
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    return response.data;
  } catch (error) {
    console.error("캘린더 입장 오류:", error);
    throw error;
  }
};

// 로그인 한 사용자의 해당 캘린더에서의 멤버 정보 가져오기
export const getCalMberInfo = async (no) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/calendarMber/getCalMberInfo/${no}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch calendar member information", error);
    throw error;
  }
};

/**
 * 마이페이지 관련 api
 */

// 프로필 select
export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/calendarMber/getProfiles`, {
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

// 프로필 update
export const updateProfile = async (no, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/calendarMber/modifyProfile/${no}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    return response.data;
  } catch (error) {
    console.error("캘린더 수정 오류:", error);
    throw error;
  }
};

/**
 * 참여자 목록 관련 api
 */
export const fetchCalMberInfos = async (no) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/calendarMber/selectCalMberInfo/${no}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // for 세션 공유
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch calendar member information", error);
    throw error;
  }
};
