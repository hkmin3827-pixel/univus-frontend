import React, { useState } from "react";
import "../../styles/TodoForm.css";

export default function TodoForm({ onCreate }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onCreate(content); // TodoPage의 handleCreate 호출
    setContent(""); // 입력 필드 초기화
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        width: "100%",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새 할일 입력"
        style={{
          flex: 1,
          padding: "12px",
          fontSize: "14px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        type="submit"
        className="add-btn"
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4a4acc")}
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#050507ff")
        }
      >
        추가
      </button>
    </form>
  );
}
