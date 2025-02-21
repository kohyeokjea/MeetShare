import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

import naviNext from "../assets/images/navi_next.png";
import ToastEditor from "../components/ToastEditor";
import DatePicker from "../components/DatePicker";
import CirclePicker from "../components/CirclePicker";
import { createTodo } from "../services/todoApi";

function TodoWrite() {
  const [formData, setFormData] = useState({
    title: "",
    writer: "",
    startDate: "",
    endDate: "",
    color: "",
    content: "",
  });

  // ---------- input 처리 ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ---------- 시작일, 종료일 처리 ----------
  const [startDate, setStartDate] = useState(null); // 시작일
  const [endDate, setEndDate] = useState(null); // 종료일

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    setFormData((prevData) => ({
      ...prevData,
      startDate: newDate,
    }));
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    setFormData((prevData) => ({
      ...prevData,
      endDate: newDate,
    }));
  };

  // ---------- 색깔 처리 ----------
  const [color, setColor] = useState("");

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setFormData((prevData) => ({
      ...prevData,
      color: newColor.hex,
    }));
  };

  // ---------- 내용 처리 ----------
  const [content, setContent] = useState("");

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setFormData((prevData) => ({
      ...prevData,
      content: newContent,
    }));
  };

  // ---------- 닉네임 불러오기 ----------
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const calNo = params.get("calNo");
  const token = localStorage.getItem("token");

  const getNickname = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/todo/getWriter/${calNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setFormData((prevData) => ({
        ...prevData,
        writer: response.data,
      }));
    } catch (error) {
      console.error("닉네임 불러오기 오류:", error);
    }
  }, [calNo, token]);

  useEffect(() => {
    getNickname();
  }, [getNickname]);

  // ---------- submit 처리 ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfrm = window.confirm("작성한 내용으로 일정을 등록하시겠습니까?");
    if (!isConfrm) return;

    // 시작일, 종료일 format
    const fmtFormData = {
      ...formData,
      startDate: startDate ? format(startDate, "yyyy-MM-dd HH:mm") : "",
      endDate: endDate ? format(endDate, "yyyy-MM-dd HH:mm") : "",
    };

    try {
      await createTodo(calNo, fmtFormData);
      alert("정상적으로 등록되었습니다.");
      navigate(`/todoMain?calNo=${calNo}`);
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {/* 메뉴 navigation */}
      <div className="flex items-center justify-center">
        <ul className="w-[1400px] flex items-center h-[55px] border-b-[1px] border-b-[#1353ff]">
          <li>
            <button className="flex items-center border-r-[1px] border-[#000] ml-4">
              <span className="w-[200px] text-[19px] text-left font-medium inline-block hover:text-[#1353ff]">
                캘린더 이름
              </span>
              <img src={naviNext} alt="다음 네비게이션" className="mr-4" />
            </button>
          </li>
        </ul>
      </div>
      {/* 메뉴 navigation 끝 */}

      {/* 컨텐츠 영역 */}
      <div className="flex flex-col justify-center items-center pt-6 pb-16">
        <div className="w-[1400px] min-h-[500px]">
          <div className="border-t-[4px] border-[#000] relative custom-underline2">
            <div className="board-normal-write">
              <ul>
                <li className="flex">
                  <div className="th">
                    <label htmlFor="title">제목</label>
                  </div>
                  <div className="td">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-[100%]"
                    />
                  </div>
                </li>
                <li className="flex">
                  <div className="th">
                    <label htmlFor="writer">작성자</label>
                  </div>
                  <div className="td">
                    <input
                      type="text"
                      name="writer"
                      id="writer"
                      value={formData.writer}
                      readOnly
                      className="w-[50%]"
                    />
                  </div>
                </li>
                <li className="flex">
                  <div className="th">
                    <label htmlFor="period">기간</label>
                  </div>
                  <div className="td flex items-center space-x-2">
                    {/* datePicker 출력 부분 */}
                    <DatePicker
                      label={"시작일"}
                      selectedDate={formData.startDate}
                      handleDateChange={handleStartDateChange}
                    />
                    <span>~</span>
                    <DatePicker
                      label={"종료일"}
                      selectedDate={formData.endDate}
                      handleDateChange={handleEndDateChange}
                    />
                  </div>
                </li>
                <li className="flex">
                  <div className="th">
                    <label htmlFor="color">색상</label>
                  </div>
                  <div className="td flex items-center">
                    {/* circlePicker 출력 부분 */}
                    <CirclePicker
                      color={formData.color}
                      handleColorChange={handleColorChange}
                    />
                  </div>
                </li>
                <li className="flex">
                  <div className="th">
                    <label htmlFor="content">내용</label>
                  </div>
                  <div className="td">
                    {/* editor 출력 부분 */}
                    <ToastEditor handleContentChange={handleContentChange} />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="float-right mt-4">
            <button
              onClick={handleSubmit}
              className="relative inline-block w-[120px] leading-[45px] text-center text-[18px] font-bold border-[2px] border-[#000] custom-edge-bl custom-edge-tr2 hover:border-[#1353ff]"
            >
              저장
            </button>
          </div>
          {/* 버튼 영역 끝 */}
        </div>
        {/* 컨텐츠 영역 끝 */}
      </div>
    </>
  );
}

export default TodoWrite;
