// Toast-editor 사용
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/toastui-editor.css";
// 한글 설정
import "@toast-ui/editor/dist/i18n/ko-kr";
// 색상 플러그인 설정
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

function ToastEditor({ content, handleContentChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editorInstance = new Editor({
      el: editorRef.current,
      height: "400px",
      initialEditType: "wysiwyg",
      hideModeSwitch: true, // 하단 에디터 타입 숨김
      autofocus: false,
      initialValue: content,
      previewStyle: "vertical",
      placeholder: "내용을 입력해 주세요.",
      language: "ko-KR",
      plugins: [colorPlugin],
    });

    editorInstance.on("change", () => {
      const data = editorInstance.getHTML();
      handleContentChange(data);
    });

    return () => {
      editorInstance.destroy();
    };
  }, [content]);

  return <div ref={editorRef} />;
}

export default ToastEditor;
