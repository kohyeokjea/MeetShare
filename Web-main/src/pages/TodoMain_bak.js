import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import naviNext from "../assets/images/navi_next.png";
import calPrev from "../assets/images/cal_prev.png";
import calNext from "../assets/images/cal_next.png";
import star from "../assets/images/star.png";
// 모달 Component
import MberMngModal from "../components/MberMngModal";

function TodoMain() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const no = params.get("no");

  // 모달 설정
  const [openMberMngModal, setOpenMberMngModal] = useState(false);
  return (
    <>
      {/* 메뉴 navigation */}
      <div className="flex items-center justify-center">
        <ul className="w-[1400px] flex items-center h-[55px]">
          <li>
            <button className="flex items-center border-r-[1px] border-[#000] ml-4">
              <span className="w-[200px] text-[19px] text-left font-medium inline-block hover:text-[#1353ff]">
                캘린더 이름
              </span>
              <img src={naviNext} alt="다음 네비게이션" className="mr-4" />
            </button>
          </li>
          <li>
            <button className="flex items-center border-r-[1px] border-[#000] ml-4">
              <span className="w-[200px] text-[19px] text-left font-medium inline-block hover:text-[#1353ff]">
                초대링크
              </span>
              <img src={naviNext} alt="다음 네비게이션" className="mr-4" />
            </button>
          </li>
          <li>
            <button
              onClick={() => setOpenMberMngModal(true)}
              className="flex items-center border-r-[1px] border-[#000] ml-4"
            >
              <span className="w-[200px] text-[19px] text-left font-medium inline-block hover:text-[#1353ff]">
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
              <li className="p-3 border border-[#afbad5] rounded-md flex items-center">
                <button>
                  <img src={star} alt="즐겨찾기" className="w-[25px]" />
                </button>
                <span className="ml-3 text-[17px]">일정1</span>
              </li>
              <li className="p-3 border border-[#afbad5] rounded-md flex items-center">
                <button>
                  <img src={star} alt="즐겨찾기" className="w-[25px]" />
                </button>
                <span className="ml-3 text-[17px]">일정2</span>
              </li>
              <li className="p-3 border border-[#afbad5] rounded-md flex items-center">
                <button>
                  <img src={star} alt="즐겨찾기" className="w-[25px]" />
                </button>
                <span className="ml-3 text-[17px]">일정3</span>
              </li>
            </ul>
          </aside>
          {/* left 일정 끝 */}

          {/* ---------- 달력 영역 ---------- */}
          <div className="flex flex-col justify-center w-[1200px] ml-12">
            {/* 상단 영역 */}
            <div>
              {/* 연도, 월 표시 */}
              <div className="flex items-center justify-center">
                <Link>
                  <img src={calPrev} alt="이전달" />
                </Link>
                <span className="font-medium text-[38px] tracking-tighter mx-[30px]">
                  2024. <span className="font-bold text-[45px]">11</span>
                </span>
                <Link>
                  <img src={calNext} alt="다음달" />
                </Link>
              </div>
              {/* 연도, 월 표시 끝 */}

              {/* 버튼 영역 */}
              <div className="float-right">
                <button
                  onClick={() => navigate(`/todoWrite?no=${no}`)}
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
              {/* 빈 날짜 출력 */}
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]"></div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]"></div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]"></div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]"></div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]"></div>
              {/* 빈 날짜 출력 끝 */}

              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>1</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] min-h-[155px]">
                <p>2</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>3</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>4</p>
              </div>
              <div className="p-2 pb-6 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px] relative">
                <p>5</p>
                <span className="custom-icon-today">TODAY</span>
                <div className="text-center mt-6 bg-[#f5ce4a] rounded-[15px]">
                  <span>일정1</span>
                </div>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>6</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>7</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>8</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] min-h-[155px]">
                <p>9</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>10</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>11</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>12</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>13</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>14</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>15</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] min-h-[155px]">
                <p>16</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>17</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>18</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>19</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>20</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>21</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>22</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] min-h-[155px]">
                <p>23</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>24</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>25</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>26</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>27</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>28</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] border-r-[1px] min-h-[155px]">
                <p>29</p>
              </div>
              <div className="p-2 border-[#313b51] border-b-[1px] min-h-[155px]">
                <p>30</p>
              </div>
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
