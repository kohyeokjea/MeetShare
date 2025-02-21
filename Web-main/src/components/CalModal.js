import React, { useEffect, useState } from "react";
import { Modal, FileInput, Label, TextInput } from "flowbite-react";
import { createCalendar, updateCalendar } from "../services/calApi";

function CalModal({ mode, data, openModal, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    password: "",
    file: null,
  });

  useEffect(() => {
    if (mode === "modify" && data) {
      // mode == "modify"
      setFormData({
        title: data.title || "",
        password: data.passwd || "",
        file: null,
      });
    } else if (mode === "write") {
      // mode == "write"
      setFormData({
        title: "",
        password: "",
        file: null,
      });
    }
  }, [mode, data]);

  // 등록
  const handleCreateCalendar = (data) => {
    try {
      createCalendar(data);
    } catch (error) {
      console.error("캘린더 생성 실패:", error);
    }
  };

  // 수정
  const handleUpdateCalendar = (no, data) => {
    try {
      updateCalendar(no, data);
      // loadCalendar();
    } catch (error) {
      console.error("캘린더 수정 실패:", error);
    }
  };

  // form 데이터 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, password, file } = formData;

    const isConfrm = window.confirm(
      mode == "write"
        ? "작성한 내용으로 캘린더를 등록하시겠습니까?"
        : "작성한 내용으로 캘린더를 수정하시겠습니까?"
    );
    if (!isConfrm) return;

    if (mode === "write") {
      handleCreateCalendar(formData);
      window.alert("정상적으로 등록되었습니다.");
    } else if (mode === "modify") {
      handleUpdateCalendar(data.no, formData);
      window.alert("정상적으로 수정되었습니다.");
    }

    window.location.reload(); // 새로고침
    onClose(); // 모달 닫기
  };

  // input value 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // file value 업데이트
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0], // 단일 파일만 가능
    }));
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
            {mode === "write" ? "캘린더 등록" : "캘린더 수정"}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <Modal.Body className="w-full p-4">
            <div className="space-y-4">
              {/* 제목 입력 */}
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="title" value="제목" />
                </div>
                <TextInput
                  name="title"
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="password" value="비밀번호" />
                </div>
                <TextInput
                  name="password"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
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
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-t border-t-[#000] p-4">
            <div className="ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="bg-[#ff0048] text-white text-[17px] font-semibold px-4 py-2 mr-1"
              >
                취소
              </button>
              <button
                type="submit"
                className="text-white text-[17px] font-semibold px-4 py-2 bg-[#1353ff]"
              >
                저장
              </button>
            </div>
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export default CalModal;
