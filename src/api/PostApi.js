import axios from "axios";

const BASE_URL = "http://localhost:8111";

const postApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const PostApi = {
  // 게시글 생성
  createPost: (teamId, boardId, title, content, fileUrl, fileName) =>
    postApi.post(`/team/${teamId}/board/${boardId}/post/create`, {
      title,
      content,
      fileUrl,
      fileName,
    }),

  // 게시글 상세 조회
  getPostDetail: (teamId, boardId, postId) =>
    postApi.get(`/team/${teamId}/board/${boardId}/post/detail/${postId}`),

  // 게시글 목록 조회 (페이징)
  getPostList: (teamId, boardId, page = 0, size = 20, keyword = "") =>
    postApi.get(`/team/${teamId}/board/${boardId}/post/list`, {
      params: { boardId, page, size, keyword },
    }),

  // 게시글 삭제
  deletePost: (teamId, boardId, postId) =>
    postApi.delete(`/team/${teamId}/board/${boardId}/post/delete/${postId}`),

  // 게시글 수정
  updatePost: (teamId, boardId, postId, title, content, fileUrl, fileName) =>
    postApi.put(`/team/${teamId}/board/${boardId}/post/update/${postId}`, {
      title,
      content,
      fileUrl,
      fileName,
    }),
};

export default PostApi;
