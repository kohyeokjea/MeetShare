import React from "react";
import { Modal, Avatar, Button } from "flowbite-react";

function MberMngModal({ openModal, onClose }) {

  
  return (
    <Modal
      show={openModal}
      onClose={onClose}
      size="md"
      position="center"
      className="bg-opacity-20"
    >
      <div className="flex flex-col rounded-lg bg-white border-[2px] border-[#000]">
        {/* Modal header */}
        <div className="rounded-t-lg p-4 border-b border-b-[#000] bg-gray-100 ">
          <h2 className="text-[25px] font-bold text-[#000] antialiased">
            참여자 목록
          </h2>
        </div>

        {/* Modal body */}
        <div className="w-full p-4">
          <form className="space-y-4">
            <div className="flex items-center justify-between">
              {/* 프로필 사진 출력 */}
              <Avatar img="" rounded />

              {/* 참여자 이름 */}
              <span className="text-base">참여자1</span>

              {/* 버튼 영역 */}
              <div className="relative space-x-1">
                <Button
                  color="gray"
                  className="inline-block focus:ring-0 py-[2px]"
                >
                  나가기
                </Button>
                <Button color="dark" className="inline-block focus:ring-0">
                  강퇴하기
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end p-4 border-t border-t-[#000]">
          <button
            onClick={onClose}
            className="bg-[#ff0048] text-white text-[17px] font-semibold px-4 py-2"
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default MberMngModal;
