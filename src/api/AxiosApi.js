import axios from "axios"; // 비동기 통신 라이브러리를 가져 오기
const DOMAIN = "http://localhost:8111";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: DOMAIN,
  withCredentials: true, // pring Security 세션 방식 필수
});

const AxiosApi = {
  // 객체 생성
  // 로그인

  login: async (email, pwd) => {
    // 이메일과 비밀번호를 body에 실어서 전송
    return await axios.post(DOMAIN + "/auth/login", { email, pwd }); // 백엔드의 변수명과 동일해야 함
  },
  // 이메일로 가입 여부 확인
  emailcheck: async (email) => {
    const res = await axios.get(
      DOMAIN + `/auth/exists/${encodeURIComponent(email)}`
    );
    return res.data; // <- true 또는 false 만 리턴
  },
  // 회원 가입
  signup: async (email, pwd, name, tel, role) => {
    return await axios.post(DOMAIN + "/auth/signup", {
      email,
      pwd,
      name,
      tel,
      role,
    });
  },
  // 회원 목록 가져 오기
  members: async () => {
    return await axios.get(DOMAIN + "/users/list");
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
    return await axios.get(DOMAIN + `/api/boards/${boardId}`);
  },
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
};

export default AxiosApi;
