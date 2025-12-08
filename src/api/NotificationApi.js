// src/api/NotificationApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8111";

const notiApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const NotificationApi = {
  getTodo: (userId, teamId, page = 0, size = 20) =>
    notiApi.get(
      `/notifications/todo/${userId}/${teamId}?page=${page}&size=${size}`
    ),

  getTodoUnchecked: (userId, teamId, page = 0, size = 20) =>
    notiApi.get(
      `/notifications/todo/unchecked/${userId}/${teamId}?page=${page}&size=${size}`
    ),

  getComment: (userId, teamId, page = 0, size = 20) =>
    notiApi.get(
      `/notifications/comment/${userId}/${teamId}?page=${page}&size=${size}`
    ),

  getCommentUnchecked: (userId, teamId, page = 0, size = 20) =>
    notiApi.get(
      `/notifications/comment/unchecked/${userId}/${teamId}?page=${page}&size=${size}`
    ),

  markChecked: (id) => notiApi.post(`/notifications/check/${id}`),
};

export default NotificationApi;
