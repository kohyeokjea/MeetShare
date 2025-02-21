import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import { format } from "date-fns";
import naviNext from "../assets/images/navi_next.png";
import Comment from "../components/Comment";
// api import
import { getTodoByNo, deleteTodo } from "../services/todoApi";

function TodoView() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const calNo = params.get("calNo");
  const todoNo = params.get("todoNo");

  const [todo, setTodo] = useState("");

  // ---------- 일정 불러오기 ----------
  useEffect(() => {
    const loadTodo = async () => {
      try {
        const data = await getTodoByNo(todoNo);

        // 날짜 format
        const fmtStartDate = format(
          new Date(data.startDate),
          "yyyy-MM-dd HH:mm"
        );
        const fmtEndDate = format(new Date(data.endDate), "yyyy-MM-dd HH:mm");

        setTodo({
          ...data,
          startDate: fmtStartDate,
          endDate: fmtEndDate,
        });
      } catch (error) {
        console.error("Failed to view todo:", error);
      }
    };
    loadTodo();
  }, []);

  // ---------- 일정 삭제 ----------
  const handleDelete = async () => {
    if (
      window.confirm(
        "삭제하면 복구할 수 없습니다. 해당 캘린더를 삭제하시겠습니까?"
      )
    ) {
      try {
        await deleteTodo(todoNo);
        alert("정상적으로 삭제되었습니다.");
        navigate(`/todoMain?calNo=${calNo}`);
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
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
      <div className="flex flex-col justify-center items-center pt-6 pb-12">
        <div className="w-[1400px] min-h-[500px]">
          <div className="flex flex-col justify-center items-center border-t-[4px] border-[#000] relative custom-underline2">
            <div className="py-10">
              <span className="text-[23px] font-bold">{todo.title}</span>
            </div>
            <div className="w-full min-h-[50px] flex bg-[#fafafa]">
              <div className="min-w-[50%] border-[1px] border-[#000] border-x-0 flex justify-start items-center p-4 text-[18px]">
                <div className="flex">
                  {/* <img src={calendar} alt="달력"/> */}
                  <span className="mr-3 text-[#001985] font-bold">기간</span>
                  <div className="font-medium">
                    <span>{todo.startDate}</span>
                    <span className="mx-2">~</span>
                    <span>{todo.endDate}</span>
                  </div>
                </div>
              </div>
              <div className="min-w-[50%] border-[1px] border-[#000] border-l-[1px] border-r-0 flex justify-start items-center p-4 text-[18px]">
                <div>
                  <span className="mr-3 text-[#001985] font-bold">작성자</span>
                  <span className="font-medium">{todo.writer}</span>
                </div>
              </div>
            </div>
          </div>
          {todo.content && (
            <div className="min-h-[300px] p-4">
              <Viewer initialValue={todo.content} />
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="float-right">
            <button
              onClick={handleDelete}
              className="relative inline-block w-[120px] leading-[45px] text-center text-[18px] font-bold border-[2px] border-[#000] custom-edge-bl2 custom-edge-tr3 hover:border-[#ff0054] mr-1"
            >
              삭제
            </button>
            <button
              onClick={() =>
                navigate(`/todoModify?calNo=${calNo}&todoNo=${todoNo}`)
              }
              className="relative inline-block w-[120px] leading-[45px] text-center text-[18px] font-bold border-[2px] border-[#000] custom-edge-bl custom-edge-tr2 hover:border-[#1353ff]"
            >
              수정
            </button>
          </div>
          {/* 버튼 영역 끝 */}
        </div>
        {/* 컨텐츠 영역 끝 */}

        {/* 댓글 영역 */}
        <Comment />
        {/* 댓글 영역 끝 */}
      </div>
    </>
  );
}

export default TodoView;
