import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import naviNext from "../assets/images/navi_next.png";
import calPrev from "../assets/images/cal_prev.png";
import calNext from "../assets/images/cal_next.png";
import star from "../assets/images/star.png";
import yellowStar from "../assets/images/star_yellow.png";

// 모달 Component
import MberMngModal from "../components/MberMngModal";
// api import
import { getCalMberInfo } from "../services/calApi";
import { fetchTodo, updateOrder } from "../services/todoApi";
// zustand store import
import useCalMberInfoStore from "../hooks/useCalMberInfoStore";

function TodoMain() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const calNo = params.get("calNo");

  // ---------- 캘린더 멤버 정보 가져오기 for 권한처리 ----------
  const { calMber, setCalMber } = useCalMberInfoStore();

  useEffect(() => {
    async function getCalMberInfo() {
      try {
        const data = await getCalMberInfo(calNo);
        setCalMber(data);
      } catch (error) {
        console.error("Error fetching calendar member:", error);
      }
    }

    getCalMberInfo();
  }, [calNo, setCalMber]);

  // ---------- 모달 설정 ----------
  const [openMberMngModal, setOpenMberMngModal] = useState(false);

  // ---------- 달력 설정 ----------
  const [todos, setTodos] = useState([]); // 일정 담는 배열
  const [date, setDate] = useState(new Date()); // 날짜
  const year = date.getFullYear(); // 년
  const month = date.getMonth(); // 월

  const generateCalendar = () => {
    const startDay = new Date(year, month, 1); // 해당 월의 시작일
    const endDay = new Date(year, month + 1, 0); // 해당 월의 마지막일
    const firstDay = startDay.getDay(); // 해당 월의 1일이 시작되는 요일
    const daysInMonth = endDay.getDate(); // 해당 월의 총 일수
    const today = new Date(); // 오늘 날짜
    const days = [];

    // 비어있는 셀 추가(1일 전)
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]"
        ></div>
      );
    }

    // 현재 달과 일치하는 셀 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const currDateCell = new Date(date.getFullYear(), date.getMonth(), day);

      // 오늘 날짜
      const isToday =
        today.getFullYear() === currDateCell.getFullYear() &&
        today.getMonth() === currDateCell.getMonth() &&
        today.getDate() === currDateCell.getDate();

      // 마지막 셀
      const isLastCell = (firstDay + day - 1) % 7 === 6;

      // 각 날짜가 일정기간 내 포함되는지 확인
      const dayTodos = todos.filter((todo) => {
        const todoStartDate = new Date(todo.startDate);
        todoStartDate.setHours(0, 0, 0, 0); // for 시간 00:00:00 format

        const todoEndDate = new Date(todo.endDate);
        todoEndDate.setHours(0, 0, 0, 0); // for 시간 00:00:00 format

        return (
          currDateCell >= todoStartDate &&
          currDateCell <= todoEndDate &&
          todoStartDate.getMonth() === date.getMonth() &&
          todoStartDate.getFullYear() === date.getFullYear()
        );
      });

      // 일정 출력
      days.push(
        <div
          key={day}
          className={`p-2 border-[#313b51] border-b-[1px] ${
            isLastCell ? "" : "border-r-[1px]"
          } min-h-[155px] relative`}
        >
          <p>{day}</p>
          {isToday && <span className="custom-icon-today">TODAY</span>}
          {dayTodos.map((todo) => (
            <div
              key={todo.no}
              className="mt-2 text-center text-white font-medium rounded-[15px] p-1 break-keep cursor-pointer"
              style={{ backgroundColor: todo.color }}
              onClick={() =>
                navigate(`/todoview?calNo=${calNo}&todoNo=${todo.no}`)
              } // 클릭 시 /todoView 로 이동
            >
              <span>{todo.title}</span>
            </div>
          ))}
        </div>
      );
    }

    // 비어있는 셀 추가(마지막 일 이후)
    const totalCells = firstDay + daysInMonth; // 총 셀
    const remainingCells = 7 - (totalCells % 7); // 남아있는 셀

    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        const isLastCell = (totalCells + i) % 7 === 6;
        days.push(
          <div
            key={`empty-end-${i}`}
            className={`p-2 border-[#313b51] border-b-[1px] ${
              isLastCell ? "" : "border-r-[1px]"
            } min-h-[155px]`}
          ></div>
        );
      }
    }

    return days;
  };

  // ---------- 이전달, 다음달 ----------
  const goPrev = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goNext = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // ---------- 이달의 일정 ----------
  const [monthTodos, setMonthTodos] = useState([]);
  console.log("monthTodos >>>>> " + monthTodos);

  const monthlyTodos = (todos, year, month) => {
    return todos.filter((todo) => {
      const todoStartDate = new Date(todo.startDate);

      return (
        todoStartDate.getFullYear() === year &&
        todoStartDate.getMonth() === month
      );
    });
  };

  // ---------- 이달의 일정 상단고정 ----------
  const handleToggle = async (no) => {
    if (window.confirm("일정을 상단에 고정하시겠습니까?")) {
      try {
        await updateOrder(no);
      } catch (error) {
        console.error("Failed to fetch todo:", error);
      }
    }
  };

  // ---------- 일정 불러오기 ----------
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodo(calNo);
        setTodos(data);

        // ---------- 이달의 일정 불러오기 ----------
        const fltrTodos = monthlyTodos(data, year, month);
        setMonthTodos(fltrTodos);
        // ----------------------------------------
      } catch (error) {
        console.error("Failed to fetch todo:", error);
      }
    };
    loadTodos();
  }, []);

  // ---------- 초대링크 ----------
  // UUID 생성
  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16); // 16진수로 변환
      }
    );
  };

  const copyLink = () => {
    const uniqueId = generateUUID(); // UUID
    const link = `${window.location.origin}/password?calNo=${calNo}&${uniqueId}`; // 링크

    // 링크 복사
    navigator.clipboard
      .writeText(link)
      .then(() => alert("초대링크가 클립보드에 복사되었습니다."))
      .catch((error) => alert("초대링크 복사실패: " + error));
  };

  return (
    <>
      {/* 메뉴 navigation */}
      <div className="flex items-center justify-center">
        <ul className="w-[1400px] flex items-center h-[55px]">
          <li>
            <button className="flex items-center border-r-[1px] border-[#000] ml-4 hover:text-[#1353ff]">
              <span className="w-[200px] text-[19px] text-left font-medium inline-block">
                캘린더 이름
              </span>
              <img src={naviNext} alt="다음 네비게이션" className="mr-4" />
            </button>
          </li>
          <li>
            <button
              onClick={copyLink}
              className="flex items-center border-r-[1px] border-[#000] ml-4 hover:text-[#1353ff]"
            >
              <span className="w-[200px] text-[19px] text-left font-medium inline-block">
                초대링크 복사
              </span>
              <img src={naviNext} alt="다음 네비게이션" className="mr-4" />
            </button>
          </li>
          <li>
            <button
              onClick={() => setOpenMberMngModal(true)}
              className="flex items-center border-r-[1px] border-[#000] ml-4 hover:text-[#1353ff]"
            >
              <span className="w-[200px] text-[19px] text-left font-medium inline-block">
                참여자 목록
              </span>
              <img src={naviNext} alt="다음 네비게이션" className="mr-4" />
            </button>
            {/* 참여자 목록 모달 */}
            <MberMngModal
              openModal={openMberMngModal}
              onClose={() => setOpenMberMngModal(false)}
            />
          </li>
        </ul>
      </div>
      {/* 메뉴 navigation 끝 */}

      {/* 공지 div */}
      <div className="flex items-center justify-center">
        <div className="w-[1400px] p-5 border-[2px] border-[#475cf8] rounded-[15px] mt-10">
          <ul className="">
            <li className="text-[18px] relative pl-[15px] custom-icon1">
              공지1가 들어갈 곳입니다.
            </li>
            <li className="text-[18px] relative pl-[15px] custom-icon1 mt-1">
              공지2가 들어갈 곳입니다.
            </li>
          </ul>
        </div>
        <hr />
      </div>
      {/* 공지 div 끝 */}

      <div className="flex justify-center">
        <div className="min-h-[800px] flex px-4 py-12">
          {/* left 일정 */}
          <aside className="w-[350px] min-h-[500px] p-4 border-[1px] border-[#000] rounded-tr-[30px] rounded-bl-[30px]">
            <h2 className="text-[18px] font-semibold mb-4 flex items-center">
              이달의 일정
            </h2>
            <ul className="space-y-2 border-t-[1px] pt-4">
              {monthTodos.length === 0 ? (
                <p className="text-[16px]">이번 달에는 일정이 없습니다.</p>
              ) : (
                monthTodos.map((todo) => (
                  <li
                    key={todo.no}
                    className="p-3 border border-[#afbad5] rounded-md flex items-center"
                  >
                    <button onClick={() => handleToggle(todo.no)}>
                      <img
                        src={todo.ordr === 0 ? star : yellowStar}
                        alt="즐겨찾기"
                        className="w-[25px]"
                      />
                    </button>
                    <span
                      onClick={() =>
                        navigate(`/todoview?calNo=${calNo}&todoNo=${todo.no}`)
                      }
                      className="ml-3 text-[17px] hover:cursor-pointer hover:underline"
                    >
                      {todo.title}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </aside>
          {/* left 일정 끝 */}

          {/* ---------- 달력 영역 ---------- */}
          <div className="flex flex-col justify-center w-[1200px] ml-12">
            {/* 상단 영역 */}
            <div>
              {/* 연도, 월 표시 */}
              <div className="flex items-center justify-center">
                <button onClick={goPrev}>
                  <img src={calPrev} alt="이전달" className="w-full" />
                </button>
                <span className="font-medium text-[38px] tracking-tighter mx-[30px]">
                  {date.getFullYear()}.{" "}
                  <span className="font-bold text-[45px]">
                    {date.getMonth() + 1}
                  </span>
                </span>
                <button onClick={goNext}>
                  <img src={calNext} alt="다음달" className="w-full" />
                </button>
              </div>
              {/* 연도, 월 표시 끝 */}

              {/* 버튼 영역 */}
              <div className="float-right">
                <button
                  onClick={() => navigate(`/todoWrite?calNo=${calNo}`)}
                  className="relative inline-block w-[120px] leading-[45px] text-center text-[18px] font-bold border-[2px] border-[#000] custom-edge-bl custom-edge-tr2 hover:border-[#1353ff]"
                >
                  등록
                </button>
                {/* 일정 등록 모달 */}
              </div>
              {/* 버튼 영역 끝 */}
            </div>
            {/* 상단 영역 끝 */}

            {/* 달력 시작 */}
            <div className="grid grid-cols-7 gap-1 text-center  text-[18px] font-medium bg-[#313b51] text-[white] mt-2">
              <div className="py-3">일</div>
              <div className="py-3">월</div>
              <div className="py-3">화</div>
              <div className="py-3">수</div>
              <div className="py-3">목</div>
              <div className="py-3">금</div>
              <div className="py-3">토</div>
            </div>

            <div className="grid grid-cols-7 text-right">
              {generateCalendar()}
            </div>
            {/* 달력 끝 */}
          </div>
          {/* ---------- 달력 영역 끝 ---------- */}
        </div>
      </div>
    </>
  );
}

export default TodoMain;
