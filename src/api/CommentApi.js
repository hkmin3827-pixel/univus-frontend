// src/api/CommentApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8111";

const commentApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const CommentApi = {
  // 댓글 생성
  createComment: (postId, content) =>
    commentApi.post("/comment/create", { postId, content }),

  // 댓글 전체 조회 (페이지네이션)
  getComments: (postId, page = 0, size = 10, keyword = "") =>
    commentApi.get("/comment/list", {
      params: { postId, page, size, keyword },
    }),

  // 댓글 수정
  updateComment: (commentId, content) =>
    commentApi.put(`/comment/update/${commentId}`, { content }),

  // 댓글 삭제
  deleteComment: (commentId) =>
    commentApi.delete(`/comment/delete/${commentId}`),
};

export default CommentApi;
