import React from "react";
import { modifyTodo } from "../../api/TodoApi";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../../context/TodoContext";

export default function MiniTodoList({ selectedTeamId }) {
  const { todos, toggleTodo } = useTodo();
  const navigate = useNavigate();

  const pendingTodos = todos.filter((t) => !t.done);
  const completedTodos = todos.filter((t) => t.done);

  return (
    <div
      style={{
        padding: "12px",
        borderTop: "1px solid #ddd",
        maxWidth: "300px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <h4 style={{ flex: 1, margin: 0 }}>최근 할일</h4>
        <button
          onClick={() => navigate(`/team/${selectedTeamId}/todo`)}
          style={{
            backgroundColor: "#5f5fff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#4a4acc")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#5f5fff")
          }
        >
          +
        </button>
      </div>

      {(!pendingTodos || pendingTodos.length === 0) && (
        <p style={{ fontSize: "12px", color: "#999" }}>할 일이 없습니다.</p>
      )}

      {[...pendingTodos].slice(0, 5).map((todo) => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "6px",
            textDecoration: todo.done ? "line-through" : "none",
            opacity: todo.done ? 0.6 : 1,
          }}
        >
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id, !todo.done)}
            style={{ marginRight: "6px" }}
          />
          <span
            style={{ flex: 1, fontSize: "13px", cursor: "pointer" }}
            onClick={() => navigate(`/team/${selectedTeamId}/todo`)}
          >
            {todo.content.length > 15
              ? todo.content.slice(0, 15) + "…"
              : todo.content}
          </span>
        </div>
      ))}
    </div>
  );
}
