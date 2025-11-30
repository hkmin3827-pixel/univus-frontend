// src/api/AxiosApi.js
import axios from "axios";

const DOMAIN = "http://localhost:8111";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: DOMAIN,
  withCredentials: true, // pring Security 세션 방식 필수
});

const AxiosApi = {
  // ------------------ AUTH API ------------------
  // 로그인
  login: (email, pwd) => axios.post(`${DOMAIN}/auth/login`, { email, pwd }),
  // 이메일로 가입 여부 확인
  emailcheck: async (email) => {
    const res = await axios.get(
      `${DOMAIN}/auth/exists/${encodeURIComponent(email)}`
    );
    return res.data; // true / false
  },
  // 로그아웃
  logout: async () => {
    return await api.post("/auth/logout");
  },

  // 회원 가입
  signup: async (email, pwd, name, tel, role) => {
    return await api.post("/auth/signup", {
      email,
      pwd,
      name,
      phone: tel,
      role,
    });
  },
  // 회원 목록 가져 오기

  // 유저 공통 정보 수정
  updateUserProfile: async (email, payload) => {
    return await api.put(`/user/${encodeURIComponent(email)}`, payload);
  },

  // 학생 전용
  updateStudentProfile: async (email, payload) => {
    return await api.put(
      `/profile/student/${encodeURIComponent(email)}`,
      payload
    );
  },

  // 교수 전용
  updateProfessorProfile: async (email, payload) => {
    return await api.put(
      `/profile/professor/${encodeURIComponent(email)}`,
      payload
    );
  },

  getUserProfile: async (email) => {
    return await api.get(`/user/me/${encodeURIComponent(email)}`);
  },

  getStudentProfile: async (email) => {
    return await api.get(`/profile/students/${encodeURIComponent(email)}`);
  },

  getProfessorProfile: async (email) => {
    return await api.get(`/profile/professors/${encodeURIComponent(email)}`);
  },

  // 회원 목록
  members: async () => {
    return await api.get("/user/list");
  },

  // 상세 회원
  detailmembers: async (email) => {
    return await api.get(`/user/${email}`);
  },

  // ------------------ TEAM / BOARD API ------------------
  // 팀 목록 조회 (팀 선택 모달에서 사용)
  getMyTeams: async () => {
    return await api.get("/api/teams/my");
  },

  // 게시판 조회
  getBoard: (teamId, boardId) => api.get(`/teams/${teamId}/board/${boardId}`),
  // ------------------ POST API ------------------
  // 게시글 작성
  postWrite: async (boardId, title, content, imgUrl) => {
    return await api.post("/post/create", {
      boardId,
      title,
      content,
      imgUrl,
    });
  },
  // 게시물 전체 조회(게시판별)
  postListPaged: async (boardId, page = 0, size = 10) => {
    return await axios.get(DOMAIN + `/post/board/${boardId}`, {
      params: { page, size },
    });
  },
  // 게시글 상세조회
  getPost: async (postId) => {
    return await api.get(`/post/${postId}`);
  },
  // 팀 생성
  createTeam: async (teamName, description, leaderId) => {
    return await api.post("/teams/create", {
      teamName,
      description,
      leaderId,
    });
  },

  // 초대 조회
  getInvites: async (email) => {
    return await api.get(`/teams/invites?email=${email}`);
  },

  // 초대 수락
  acceptInvite: async (inviteId) => {
    return await api.post(`/teams/invite/${inviteId}/accept`);
  },

  // 초대 거절
  declineInvite: async (inviteId) => {
    return await api.post(`/teams/invite/${inviteId}/decline`);
  },

  // 🔹 보드별 팀원 기여도 리스트
  getBoardContribution: (boardId) =>
    api.get(`/activity/board/${boardId}/contribution`),

  // 🔹 특정 팀원의 상세 기여도
  getUserContributionDetail: (userId, boardId) =>
    api.get(`/activity/user/${userId}/board/${boardId}/detail`),

  // 🔹 게시글 TOP5
  getPostTop5: (boardId) => api.get(`/activity/board/${boardId}/top5/posts`),

  // 🔹 댓글 TOP5
  getCommentTop5: (boardId) =>
    api.get(`/activity/board/${boardId}/top5/comments`),

  // 🔹 리액션 TOP5
  getReactionTop5: (boardId) =>
    api.get(`/activity/board/${boardId}/top5/reactions`),

  searchComments: async (keyword, page = 0, size = 10) => {
    const res = await api.get("/comment/search", {
      params: { keyword, page, size },
    });
    return res.data; // { content, totalPages, ... }
  },
};

export default AxiosApi;
