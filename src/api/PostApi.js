import axios from "axios";

const BASE_URL = "http://localhost:8111";

const postApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const PostApi = {
  // 게시글 생성
  createPost: (boardId, title, content, fileUrl, fileName) =>
    postApi.post(`/post/create/${boardId}`, {
      title,
      content,
      fileUrl,
      fileName,
    }),

  // 게시글 상세 조회
  getPostDetail: (postId) => postApi.get(`/post/detail/${postId}`),

  // 게시글 목록 조회 (페이징)
  getPostList: (boardId, page = 0, size = 20, keyword = "") =>
    postApi.get(`/post/list`, {
      params: { boardId, page, size, keyword },
    }),

  // 게시글 삭제
  deletePost: (postId) => postApi.delete(`/post/delete/${postId}`),

  // 게시글 수정
  updatePost: (postId, title, content, fileUrl, fileName) =>
    postApi.put(`/post/update/${postId}`, {
      title,
      content,
      fileUrl,
      fileName,
    }),
};

export default PostApi;
