import axios from "axios"; // 비동기 통신 라이브러리를 가져 오기
const DOMAIN = "http://localhost:8111";
// https://192.168.219.175:3310

const AxiosApi = {
  // 객체 생성
  // 로그인

  login: async (email, pwd) => {
    // 이메일과 비밀번호를 body에 실어서 전송
    return await axios.post(DOMAIN + "/auth/login", { email, pwd }); // 백엔드의 변수명과 동일해야 함
  },

  // 이메일로 가입 여부 확인
  emailcheck: async (email) => {
    return await axios.get(DOMAIN + `/auth/exists/${email}`);
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

  getboard: async (boardId) => {
    return await axios.get(DOMAIN + `/api/boards/${boardId}`);
  },
  getpost: async (postId) => {
    return await axios.get(DOMAIN + `/api/posts/${postId}`);
  },
};

export default AxiosApi;
