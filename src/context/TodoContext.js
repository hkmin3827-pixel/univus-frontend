import { createContext, useContext, useState, useEffect } from "react";
import { getAllTodo, createTodo, modifyTodo, deleteTodo } from "../api/TodoApi";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const addTodo = async ({ boardId, email, content }) => {
    await createTodo({ boardId, email, content });
    await fetchTodos();
  };

  const toggleTodo = async (id, done) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // UI 적용
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));

    try {
      await modifyTodo(id, { content: todo.content, done });
    } catch (err) {
      console.error("Todo 수정 실패:", err);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !done } : t))
      );
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, loading, fetchTodos, addTodo, toggleTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
