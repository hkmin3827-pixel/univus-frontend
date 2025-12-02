import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";
import { useTodo } from "../context/TodoContext";

export default function TodoPage() {
  const { teamId, boardId } = useParams();
  const {
    todos,
    loading,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    resetTodos,
  } = useTodo();

  const currentKey = `${teamId}-${boardId}`;
  const currentTodos = todos[currentKey] || [];

  useEffect(() => {
    if (teamId && boardId) {
      fetchTodos(Number(teamId), Number(boardId));
    }
  }, [teamId, boardId]);

  const pendingTodos = currentTodos.filter((t) => !t.done);
  const completedTodos = currentTodos.filter((t) => t.done);

  const handleCreate = (content) => {
    addTodo({ teamId: Number(teamId), boardId: Number(boardId), content });
  };

  const handleToggle = (id, done) => {
    toggleTodo(Number(teamId), Number(boardId), id, done);
  };

  const handleDelete = (id) => {
    removeTodo(Number(teamId), Number(boardId), id);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        📌 Todo List
      </h1>

      <TodoForm onCreate={handleCreate} />

      {loading ? (
        <p style={{ textAlign: "center" }}>불러오는 중...</p>
      ) : (
        <>
          <h2
            style={{
              marginTop: "24px",
              marginBottom: "12px",
              color: "#ff6b6b",
              borderBottom: "2px solid #ff6b6b",
              paddingBottom: "4px",
            }}
          >
            미완료
          </h2>
          <TodoList
            todos={pendingTodos}
            onToggleDone={handleToggle}
            onDelete={handleDelete}
          />

          <h2
            style={{
              marginTop: "24px",
              marginBottom: "12px",
              color: "#1dd1a1",
              borderBottom: "2px solid #1dd1a1",
              paddingBottom: "4px",
            }}
          >
            완료
          </h2>
          <TodoList
            todos={completedTodos}
            onToggleDone={handleToggle}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
