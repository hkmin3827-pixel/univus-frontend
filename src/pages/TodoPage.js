import React, { useEffect, useState } from "react";
import { getAllTodo, createTodo, modifyTodo, deleteTodo } from "../api/TodoApi";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";

export default function TodoPage({ userEmail, boardId }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await getAllTodo();
      setTodos(res.data);
    } catch (err) {
      console.error("Todo 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (content) => {
    if (!content.trim()) return;
    try {
      await createTodo({ boardId, email: userEmail, content });
      fetchTodos();
    } catch (err) {
      console.error("Todo 생성 실패:", err);
    }
  };

  const handleToggleDone = async (id, done) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // 1. UI 즉시 반영
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));

    // 2. 백엔드 반영 (content 포함!)
    try {
      await modifyTodo(id, { content: todo.content, done });
    } catch (err) {
      console.error("Todo 수정 실패:", err);
      // 실패 시 롤백
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !done } : t))
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Todo 삭제 실패:", err);
    }
  };

  const pendingTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

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
            onToggleDone={handleToggleDone}
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
            onToggleDone={handleToggleDone}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
