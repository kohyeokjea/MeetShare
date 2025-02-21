import React from "react";
import heart from "../assets/images/heart.png";

function Comment() {
  return (
    <section className="w-[1400px] border-[1px] border-[#afbad5] rounded-[10px] py-8 mt-4">
      <div className="px-6">
        {/* 댓글 헤더 영역 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-[#000]">
            댓글(20)
          </h2>
        </div>
        {/* 댓글 헤더 영역 끝 */}

        {/* 댓글 작성 영역 */}
        <form className="mb-16">
          <div className="py-2 px-4 mb-3 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              댓글작성
            </label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="댓글을 작성해주세요..."
            ></textarea>
          </div>
          <button className="float-right relative inline-block leading-[45px] w-[90px] text-center text-[18px] text-white font-bold bg-[#001985]">
            등록
          </button>
        </form>
        {/* 댓글 작성 영역 끝 */}

        {/* 댓글 목록 영역 */}
        {/* 댓글 */}
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="프로필 사진"
                />
                작성자1
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2024-11-06<span className="ml-2">21:20</span>
              </p>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            댓글 테스트 입니다!
          </p>
          <div className="flex items-center mt-4 space-x-2">
            <button
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
            >
              답글달기
            </button>
            <button
              type="button"
              className="flex items-center text-sm text-[#1353ff] hover:underline dark:text-gray-400 font-medium"
            >
              수정
            </button>
            <button
              type="button"
              className="flex items-center text-sm text-[#ff1361] hover:underline dark:text-gray-400 font-medium"
            >
              삭제
            </button>
            <div className="flex items-center text-sm text-gray-500 font-medium space-x-1">
              <button type="button" className="flex items-center">
                <img src={heart} alt="좋아요" className="w-[18px]" />
              </button>
              <span>1</span>
            </div>
          </div>
        </article>
        {/* 댓글 끝 */}

        {/* 답글 */}
        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="Jese Leos"
                />
                작성자2
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2024-11-06<span className="ml-2">21:21</span>
              </p>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            답글 테스트 입니다!
          </p>
          <div className="flex items-center mt-4 space-x-2">
            <button
              type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
            >
              답글달기
            </button>
            <button
              type="button"
              className="flex items-center text-sm text-[#1353ff] hover:underline dark:text-gray-400 font-medium"
            >
              수정
            </button>
            <button
              type="button"
              className="flex items-center text-sm text-[#ff1361] hover:underline dark:text-gray-400 font-medium"
            >
              삭제
            </button>
            <div className="flex items-center text-sm text-gray-500 font-medium space-x-1">
              <button type="button" className="flex items-center">
                <img src={heart} alt="좋아요" className="w-[18px]" />
              </button>
              <span>1</span>
            </div>
          </div>
        </article>
        {/* 답글 끝 */}

        {/* 댓글 목록 영역 끝*/}
      </div>
    </section>
  );
}

export default Comment;
