import React, { useState } from "react";

export default function TodoForm({ onCreate }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onCreate(content);
    setContent("");
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
        style={{
          backgroundColor: "#5f5fff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4a4acc")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5f5fff")}
      >
        추가
      </button>
    </form>
  );
}
