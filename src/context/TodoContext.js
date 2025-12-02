import { createContext, useContext, useState } from "react";
import { getAllTodo, createTodo, modifyTodo, deleteTodo } from "../api/TodoApi";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState({}); // key: "teamId-boardId"
  const [loading, setLoading] = useState(true);

  const resetTodos = () => setTodos({});

  const fetchTodos = async (teamId, boardId) => {
    if (!teamId || !boardId) return;
    const key = `${teamId}-${boardId}`;
    try {
      setLoading(true);
      const res = await getAllTodo(teamId, boardId);
      setTodos((prev) => ({ ...prev, [key]: res.data }));
    } catch (err) {
      console.error(err);
      setTodos((prev) => ({ ...prev, [key]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async ({ teamId, boardId, content }) => {
    if (!teamId || !boardId) return;
    const key = `${teamId}-${boardId}`;
    try {
      const newTodo = await createTodo({ teamId, boardId, content });
      setTodos((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), newTodo],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (teamId, boardId, id, done) => {
    const key = `${teamId}-${boardId}`;
    const todo = todos[key]?.find((t) => t.id === id);
    if (!todo) return;

    setTodos((prev) => ({
      ...prev,
      [key]: prev[key].map((t) => (t.id === id ? { ...t, done } : t)),
    }));

    try {
      await modifyTodo(id, { content: todo.content, done });
    } catch (err) {
      console.error(err);
      setTodos((prev) => ({
        ...prev,
        [key]: prev[key].map((t) => (t.id === id ? { ...t, done: !done } : t)),
      }));
    }
  };

  const removeTodo = async (teamId, boardId, id) => {
    const key = `${teamId}-${boardId}`;
    try {
      await deleteTodo(id);
      setTodos((prev) => ({
        ...prev,
        [key]: prev[key].filter((t) => t.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        fetchTodos,
        addTodo,
        toggleTodo,
        removeTodo,
        resetTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
