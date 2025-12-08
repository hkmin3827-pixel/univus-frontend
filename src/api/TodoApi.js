import axios from "axios";

const BASE_URL = "http://localhost:8111";
const API = `${BASE_URL}/todo`;

// Todo 목록 조회
export const getAllTodo = (teamId, boardId) => {
  return axios.get(`${API}/list`, {
    params: { teamId, boardId },
  });
};

// Todo ID 조회
export const getTodoById = (id) => {
  return axios.get(`${API}/${id}`);
};

// 작성자 이메일 기준 Todo 조회
export const getTodoByUser = () => {
  return axios.get(`${API}/user`);
};

// 완료 여부 기준 Todo 조회
export const getTodoByDone = (done) => {
  return axios.get(`${API}/done/${done}`);
};

// Todo 생성
export const createTodo = (data) => {
  const token = localStorage.getItem("accessToken");
  return axios.post(`${API}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Todo 수정
export const modifyTodo = (id, data) => {
  const token = localStorage.getItem("accessToken");
  return axios.put(`${API}/modify/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Todo 삭제
export const deleteTodo = (id) => {
  return axios.delete(`${API}/delete/${id}`);
};

// 팀 단위 완료 Todo 조회
export const getTeamCompletedTodos = (teamId) => {
  return axios.get(`${API}/team/${teamId}/completed`);
};
export const getTodoByBoardId = (boardId) => {
  return axios.get(`${API}/board/${boardId}/list`);
};

// 로그인한 사용자 + 게시판 기준 Todo 목록 조회
export const getMyTodoByBoard = (boardId) => {
  return axios.get(`${API}/board/${boardId}/mine`);
};
