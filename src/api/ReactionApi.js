import axios from "axios";

const DOMAIN = "http://localhost:8111/";

const instance = axios.create({
  baseURL: DOMAIN,
  withCredentials: true,
});

const ReactionApi = {
  // 1) 특정 게시글의 전체 리액션 리스트
  getReactions(postId) {
    // GET /reaction/{postId}
    return instance.get(`/reaction/${postId}`);
  },

  // 2) 리액션 토글
  toggleReaction(postId, type) {
    // POST /reaction/{postId}/toggle  body: { type: "POSITIVE" }
    return instance.post(`/reaction/${postId}/toggle`, { type });
  },

  // 3) (선택) 게시글 리액션 요약 API를 나중에 만들면 이렇게 쓸 수 있음
  // getPostReactionSummary(postId) {
  //   return instance.get(`/reaction/post/${postId}/summary`);
  // },
};

export default ReactionApi;