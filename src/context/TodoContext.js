import { createContext, useContext, useState } from "react";
import {
  createTodo,
  modifyTodo,
  deleteTodo,
  getTodoByBoardId,
} from "../api/TodoApi";
import { useActivityLog } from "./ActivityLogContext";
import { TeamContext } from "./TeamContext";
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(false);
  const { refreshActivities } = useActivityLog();
  const { selectedTeam } = useContext(TeamContext);

  const resetTodos = () => setTodos({});

  const fetchTodos = async (teamId, boardId) => {
    if (!boardId) return;
    setLoading(true);
    try {
      const res = await getTodoByBoardId(boardId);
      setTodos((prev) => ({
        ...prev,
        [boardId]: res.data, // key = boardId 로 저장
      }));
    } catch (err) {
      console.error(err);
      setTodos((prev) => ({ ...prev, [boardId]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async ({ boardId, content }) => {
    try {
      const res = await createTodo({ boardId, content });

      setTodos((prev) => ({
        ...prev,
        [boardId]: [res.data, ...(prev[boardId] || [])],
      }));
    } catch (err) {
      console.error("Todo 생성 실패 : ", err);
    }
  };

  const toggleTodo = async (boardId, todoId, done) => {
    const target = todos[boardId].find((t) => t.id === todoId);
    if (!target) return;
    // optimistic UI 업데이트
    setTodos((prev) => ({
      ...prev,
      [boardId]: prev[boardId].map((t) =>
        t.id === todoId ? { ...t, done } : t
      ),
    }));
    try {
      await modifyTodo(todoId, { content: target.content, done });
      refreshActivities(selectedTeam.id);
    } catch (err) {
      console.error("Todo 상태 변경 실패:", err);

      // 실패 시 rollback
      setTodos((prev) => ({
        ...prev,
        [boardId]: prev[boardId].map((t) =>
          t.id === todoId ? { ...t, done } : t
        ),
      }));
    }
  };

  const removeTodo = async (boardId, todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos((prev) => ({
        ...prev,
        [boardId]: prev[boardId].filter((t) => t.id !== todoId),
      }));
    } catch (err) {
      console.error("Todo 삭제 실패 : ", err);
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
