// src/context/NotificationContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import NotificationApi from "../api/NotificationApi";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchTodo = useCallback(
    async (userId, teamId, reset = false, unchecked = false) => {
      const nextPage = reset ? 0 : page;
      const api = unchecked
        ? NotificationApi.getTodoUnchecked
        : NotificationApi.getTodo;

      const res = await api(userId, teamId, nextPage);
      const content = res.data.content;

      setNotifications((prev) => (reset ? content : [...prev, ...content]));
      setPage(nextPage + 1);
      setHasMore(!res.data.last);
    },
    [page]
  );

  const fetchComment = useCallback(
    async (userId, teamId, reset = false, unchecked = false) => {
      const nextPage = reset ? 0 : page;
      const api = unchecked
        ? NotificationApi.getCommentUnchecked
        : NotificationApi.getComment;

      const res = await api(userId, teamId, nextPage);
      const content = res.data.content;

      setNotifications((prev) => (reset ? content : [...prev, ...content]));
      setPage(nextPage + 1);
      setHasMore(!res.data.last);
    },
    [page]
  );

  const markAsChecked = async (id) => {
    await NotificationApi.markChecked(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchTodo,
        fetchComment,
        markAsChecked,
        hasMore,
        setNotifications,
        setPage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
