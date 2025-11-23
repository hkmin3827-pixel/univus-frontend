// src/api/AxiosApi.js
import axios from "axios";

const DOMAIN = "http://localhost:8111";
<<<<<<< HEAD
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: DOMAIN,
  withCredentials: true, // pring Security 세션 방식 필수
=======

const api = axios.create({
  baseURL: DOMAIN,
  withCredentials: true,
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
});

const AxiosApi = {
  // 로그인
  login: async (email, pwd) => {
    return await api.post("/auth/login", { email, pwd });
  },
<<<<<<< HEAD
  // 이메일로 가입 여부 확인
  emailcheck: async (email) => {
    const res = await axios.get(
      DOMAIN + `/auth/exists/${encodeURIComponent(email)}`
    );
    return res.data; // <- true 또는 false 만 리턴
=======

  // 로그아웃
  logout: async () => {
    return await api.post("/auth/logout");
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
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
<<<<<<< HEAD
  // 회원 목록 가져 오기
=======

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
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
  members: async () => {
    return await api.get("/user/list");
  },

  // 상세 회원
  detailmembers: async (email) => {
    return await api.get(`/user/${email}`);
  },
  // 팀 목록 조회 (팀 선택 모달에서 사용)
  getMyTeams: async () => {
    return await api.get("/api/teams/my");
  },
  // 게시판 생성
  createBoard: async (teamId, name, description) => {
    return await axios.post(
      DOMAIN + "/board/create",
      {
        teamId: teamId,
        name: name,
        description: description,
      },
      { withCredentials: true }
    );
  },
  // 팀별 게시판 목록 조회
  getBoardsByTeam: async (teamId) => {
    return await api.get(`/board`, {
      params: { teamId },
    });
  },
  // 게시판 조회
  getboard: async (boardId) => {
    return await api.get(`/api/boards/${boardId}`);
  },
<<<<<<< HEAD
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
=======

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
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
  },
};

export default AxiosApi;
