import React, { useEffect, useState } from "react";
import { getAllTodo, createTodo, modifyTodo, deleteTodo } from "../api/TodoApi";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";
import { useTodo } from "../context/TodoContext";
import { useParams } from "react-router-dom";

export default function TodoPage() {
  const { teamId, boardId } = useParams();
  console.log("teamId", teamId, "boardId", boardId);
  const { todos, loading, addTodo, toggleTodo, removeTodo } = useTodo();

  const pendingTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

  const handleCreate = (content) => addTodo({ teamId, boardId, content });
  console.log("teamId", teamId, "boardId", boardId);

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
            onToggleDone={toggleTodo}
            onDelete={removeTodo}
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
            onToggleDone={toggleTodo}
            onDelete={removeTodo}
          />
        </>
      )}
    </div>
  );
}
