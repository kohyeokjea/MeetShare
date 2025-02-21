import React, { useEffect, useState } from "react";
import { Modal, FileInput, Label, TextInput } from "flowbite-react";
// api import
import { updateProfile } from "../services/calApi";

function MyPageModal({ data, openModal, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    nickName: "",
    file: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        nickName: data.nickName || "",
        file: null,
      });
    }
  }, [data]);

  // input 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // file 이면 파일을, 아니면 value를 저장
    }));
  };

  // 저장 처리
  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("nickName", formData.nickName);
    if (formData.file) {
      payload.append("file", formData.file);
    }

    try {
      await updateProfile(data.no, payload);
      alert("프로필 정보가 성공적으로 수정되었습니다.");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("프로필 정보 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <Modal
      show={openModal}
      onClose={onClose}
      size="md"
      position="center"
      className="bg-opacity-20 rounded-none"
    >
      <div className="border-[2px] border-[#000] rounded-lg">
        {/* Modal Header */}
        <div className="rounded-t-lg p-4 border-b border-b-[#000] bg-gray-100 ">
          <h2 className="text-[25px] font-bold text-[#000] antialiased">
            프로필 편집
          </h2>
        </div>

        <Modal.Body className="w-full p-4">
          <div className="space-y-4">
            {/* 캘린더 이름 */}
            <div>
              <div className="mb-1 block">
                <Label htmlFor="title" value="제목" />
              </div>
              <TextInput
                type="text"
                name="title"
                id="title"
                value={formData.title}
                readOnly
              />
            </div>

            {/* 닉네임 */}
            <div>
              <div className="mb-1 block">
                <Label htmlFor="nickName" value="닉네임" />
              </div>
              <TextInput
                type="text"
                name="nickName"
                id="nickName"
                value={formData.nickName}
                onChange={handleInputChange}
              />
            </div>

            {/* 첨부파일 입력 */}
            <div>
              <div className="mb-1 block">
                <Label htmlFor="fileUpload" value="첨부파일" />
              </div>
              <FileInput
                name="file"
                id="fileUpload"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-t border-t-[#000] p-4">
          <div className="ml-auto">
            <button
              onClick={onClose}
              className="bg-[#ff0048] text-white text-[17px] font-semibold px-4 py-2 mr-1"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="text-white text-[17px] font-semibold px-4 py-2 bg-[#1353ff]"
            >
              저장
            </button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default MyPageModal;
