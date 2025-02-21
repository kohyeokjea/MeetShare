import React from "react";
import { Link } from "react-router-dom";
import prev1 from "../assets/images/prev1_btn.png";
import prev2 from "../assets/images/prev2_btn.png";
import next1 from "../assets/images/next1_btn.png";
import next2 from "../assets/images/next2_btn.png";

function Pagination() {
  return (
    <nav className="flex justify-center mt-8 mb-12">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-blue-50"
          >
            <img src={prev2} alt="처음 페이지" />
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 hover:bg-blue-50"
          >
            <img src={prev1} alt="이전 페이지" />
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-blue-700 font-bold border border-gray-300 bg-blue-50 hover:bg-blue-50 hover:text-blue-700"
          >
            1
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-[#000] border border-gray-300 hover:bg-blue-50 hover:text-blue-700"
          >
            2
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-[#000] border border-gray-300 hover:bg-blue-50 hover:text-blue-700"
          >
            3
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <img src={next1} alt="다음 페이지" />
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 rounded-e-lg hover:bg-blue-50"
          >
            <img src={next2} alt="마지막 페이지" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
