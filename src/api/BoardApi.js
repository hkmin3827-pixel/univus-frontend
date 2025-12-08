import axios from "axios";

const BASE_URL = "http://localhost:8111";

const boardApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const BoardApi = {
  createBoard: (teamId, name, description) =>
    boardApi.post(`/team/${teamId}/board/create`, {
      teamId,
      name,
      description,
    }),

  getBoardsByTeam: (teamId) => boardApi.get(`/team/${teamId}/board/list`),
  getBoardDetail: (teamId, boardId) =>
    boardApi.get(`/team/${teamId}/board/${boardId}`),

  modifyBoard: (teamId, boardId, data) => {
    boardApi.put(`/team/${teamId}/board/${boardId}/modify`, data);
  },
  deleteBoard: (teamId, boardId) => {
    boardApi.delete(`/team/${teamId}/board/${boardId}/delete`);
  },
};

export default BoardApi;
