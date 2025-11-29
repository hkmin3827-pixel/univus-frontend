import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggleDone, onDelete }) {
  if (!todos || todos.length === 0)
    return <p style={{ color: "#999" }}>할 일이 없습니다.</p>;

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
