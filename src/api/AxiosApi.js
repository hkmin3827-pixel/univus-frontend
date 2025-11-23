// src/api/AxiosApi.js
import axios from "axios"; // 비동기 통신 라이브러리를 가져오기

const DOMAIN = "http://localhost:8111";

// 🔥 공통 설정이 들어간 axios 인스턴스 생성
const api = axios.create({
  baseURL: DOMAIN,
  withCredentials: true, // 세션 쿠키(JSESSIONID) 주고받기
});

const AxiosApi = {
  // 로그인
  login: async (email, pwd) => {
    // 이메일과 비밀번호를 body에 실어서 전송
    return await api.post("/auth/login", { email, pwd });
  },

  // 이메일로 가입 여부 확인
  emailcheck: async (email) => {
    const res = await api.get(`/auth/exists/${encodeURIComponent(email)}`);
    return res.data; // <- true 또는 false 만 리턴
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

  // 회원 목록 가져오기
  members: async () => {
    return await api.get("/user/list");
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
