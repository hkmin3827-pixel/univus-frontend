import axios from "axios";

const BASE_URL = "http://localhost:8111";

const boardApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const BoardApi = {
  createBoard: (teamId, name, description) =>
    boardApi.post(`/teams/${teamId}/board/create`, {
      teamId,
      name,
      description,
    }),

  getBoardsByTeam: (teamId) => boardApi.get(`/teams/${teamId}/board/list`),
  getBoardDetail: (boardId) => boardApi.get(`/teams/board/${boardId}`),
};

export default BoardApi;
