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

  getStudentProfile: async (email) => {
    return await api.get(`/students/${encodeURIComponent(email)}`);
  },

  // (user 정보 + 학생 정보 일부 예시)
  updateStudentProfile: async (email, payload) => {
    // payload 예: { name, tel, studentNumber, major, grade }
    return await api.put(`/student/${encodeURIComponent(email)}`, payload);
  },

  getProfessorProfile: async (email) => {
    return await api.get(`/professors/${encodeURIComponent(email)}`);
  },

  updateProfessorProfile: async (email, payload) => {
    // payload 예: { name, tel, department, position }
    return await api.put(`/professor/${encodeURIComponent(email)}`, payload);
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
};

export default AxiosApi;
