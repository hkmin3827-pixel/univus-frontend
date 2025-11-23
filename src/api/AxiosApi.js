// src/api/AxiosApi.js
import axios from "axios";

const DOMAIN = "http://localhost:8111";

const api = axios.create({
  baseURL: DOMAIN,
  withCredentials: true,
});

const AxiosApi = {
  // 로그인
  login: async (email, pwd) => {
    return await api.post("/auth/login", { email, pwd });
  },

  // 로그아웃
  logout: async () => {
    return await api.post("/auth/logout");
  },

  // 이메일 중복 체크
  emailcheck: async (email) => {
    const res = await api.get(`/auth/exists/${encodeURIComponent(email)}`);
    return res.data;
  },

  // 회원 가입
  signup: async (email, pwd, name, tel, role) => {
    return await api.post("/auth/signup", {
      email,
      pwd,
      name,
      tel,
      role,
    });
  },

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

  getboard: async (boardId) => {
    return await api.get(`/api/boards/${boardId}`);
  },

  getpost: async (postId) => {
    return await api.get(`/api/posts/${postId}`);
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
};

export default AxiosApi;
