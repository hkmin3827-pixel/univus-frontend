import React from "react";

export default function TodoItem({ todo, onToggleDone, onDelete }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        marginBottom: "8px",
        borderRadius: "6px",
        backgroundColor: todo.done ? "#e0f7e9" : "#fefefe",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}
      >
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggleDone(todo.id, !todo.done)}
          style={{ marginRight: "10px" }}
        />
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            opacity: todo.done ? 0.6 : 1,
            wordBreak: "break-word",
            whiteSpace: "normal",
            flex: 1,
          }}
        >
          {todo.content}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "#ff6b6b",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  );
}
