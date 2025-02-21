import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import fixPin from "../assets/images/pin_64px.png";
import dots from "../assets/images/dots.png";
import Pagination from "../components/Pagination";
// 모달 Component
import CalModal from "../components/CalModal";
// api import
import { fetchCalendar, deleteCalendar, checkInfo } from "../services/calApi";

function CalMain() {
  /* ---------- 모달 설정 ---------- */
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("write"); // for 등록/수정 구분
  const [data, setData] = useState(""); // for 수정 -> 데이터 전달

  const handleModal = (mode, data) => {
    setMode(mode);
    setData(data);
    setOpenModal(true);
  };

  /* ---------- 캘린더 설정 ---------- */
  const [calendar, setCalendar] = useState([]);

  // 목록
  const loadCalendar = async () => {
    try {
      const data = await fetchCalendar();
      setCalendar(data);
    } catch (error) {
      console.error("캘린더 목록 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadCalendar();
  }, []);

  // 삭제
  const handleDeleteCalendar = async (no) => {
    const isConfrm = window.confirm(
      "삭제하면 복구할 수 없습니다. 해당 캘린더를 삭제하시겠습니까?"
    );
    if (!isConfrm) return;

    try {
      await deleteCalendar(no);
      loadCalendar();
    } catch (error) {
      console.error("캘린더 삭제 실패:", error);
    }
  };

  // 캘린더 입장 -> 정보 확인
  const handleCheckInfo = async (no) => {
    try {
      await checkInfo(no);
    } catch (error) {
      console.error("캘린더 입장 실패:", error);
    }
  };
  /* ------------------------------ */

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[1400px] min-h-[800px]">
          {/* 공지 div */}
          <div className="p-5 border-[2px] border-[#475cf8] rounded-[15px] mt-10">
            <ul className="">
              <li className="text-[18px] relative pl-[15px] custom-icon1">
                공지1가 들어갈 곳입니다.
              </li>
              <li className="text-[18px] relative pl-[15px] custom-icon1 mt-1">
                공지2가 들어갈 곳입니다.
              </li>
            </ul>
          </div>
          {/* 공지 div 끝 */}

          {/* Total 페이지 div */}
          <div className="mt-10 flex items-end">
            <span>
              Total : <span className="text-[#ff1361] font-semibold">0</span>개
              (page : <span className="text-[#ff1361] font-semibold">1</span>/1)
            </span>
            {/* 버튼 영역 */}
            <div className="ml-auto">
              <button
                onClick={() => handleModal("write")}
                className="relative inline-block w-[120px] leading-[45px] text-center text-[18px] font-bold border-[2px] border-[#000] custom-edge-bl custom-edge-tr2 hover:border-[#1353ff]"
              >
                등록
              </button>
            </div>
            {/* 버튼 영역 끝 */}
          </div>
          {/* Total 페이지 div 끝 */}

          {/* 캘린더 목록 div */}
          <div className="border-t-[4px] border-[#000] relative custom-underline2 mt-2 pt-[30.5px] pb-[30.5px] flex flex-wrap gap-x-[27.5px] gap-y-[25.5px]">
            {/* 캘린더 박스 div */}
            {Array.isArray(calendar) && calendar.length > 0 ? (
              calendar.map((calendar) => (
                <div
                  key={calendar.no}
                  className="w-[32%] p-6 border-[1px] border-[#cccccc] rounded-[30px] rounded-tr-none"
                >
                  <div className="flex items-center justify-between pl-1">
                    <Link>
                      <p className="text-[18px] font-bold">{calendar.title}</p>
                    </Link>
                    <button className="w-[45px]" onClick={() => {}}>
                      <img src={fixPin} alt="고정핀" className="w-full" />
                    </button>
                  </div>
                  <ul className="mt-4">
                    <li>
                      <div
                        className="border-[1px] border-[#000] h-[300px] bg-[#e2f6ff] cursor-pointer"
                        onClick={() => handleCheckInfo(calendar.no)}
                      >
                        <img src="" alt="썸네일 이미지" />
                      </div>
                      {/* 버튼 영역 */}
                      <div className="mt-6 float-right cursor-pointer">
                        <Dropdown
                          label=""
                          renderTrigger={() => (
                            <img src={dots} alt="드롭다운 아이콘" />
                          )}
                          placement="right"
                        >
                          <Dropdown.Item
                            onClick={() => handleModal("modify", calendar)}
                            className="text-[16px] hover:font-semibold"
                          >
                            수정
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteCalendar(calendar.no)}
                            className="text-[16px] hover:font-semibold"
                          >
                            삭제
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                      {/* 버튼 영역 끝 */}
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center">
                <span className="font-medium">등록된 게시글이 없습니다.</span>
              </div>
            )}

            {/* 캘린더 박스 div 끝 */}
          </div>
          {/* 캘린더 목록 div 끝 */}

          {/* 페이지네이션 영역 */}
          <Pagination />
          {/* 페이지네이션 영역 끝 */}
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      <CalModal
        mode={mode}
        data={data}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default CalMain;
