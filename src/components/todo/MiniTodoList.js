import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../../context/TodoContext";

export default function MiniTodoList() {
  const { teamId, boardId } = useParams();
  const todoContext = useTodo();
  const navigate = useNavigate();
  if (!todoContext) return null;

  const { todos } = todoContext;
  const key = `${teamId}-${boardId}`;
  const currentTodos = todos[key] || [];

  const pendingTodos = currentTodos.filter((t) => !t.done);

  const handlePlusClick = () => {
    if (!boardId) return alert("먼저 게시판을 선택하세요!");
    navigate(`/team/${teamId}/board/${boardId}/todo`);
  };

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
          onClick={handlePlusClick}
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
          }}
        >
          +
        </button>
      </div>

      {(!boardId || pendingTodos.length === 0) && (
        <p style={{ fontSize: "12px", color: "#999" }}>
          {boardId ? "할 일이 없습니다." : "게시판을 선택하세요."}
        </p>
      )}

      {pendingTodos.slice(0, 5).map((todo) => (
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
            onChange={() =>
              todoContext.toggleTodo(
                Number(teamId),
                Number(boardId),
                todo.id,
                !todo.done
              )
            }
          />
          <span style={{ flex: 1, fontSize: "13px", cursor: "pointer" }}>
            {todo.content.length > 15
              ? todo.content.slice(0, 15) + "…"
              : todo.content}
          </span>
        </div>
      ))}
    </div>
  );
}
