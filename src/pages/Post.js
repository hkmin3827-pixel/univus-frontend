// 게시물 페이지
import React, { useEffect, useState } from "react";
import axios from "../api/AxiosApi";
import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const { postId } = useParams(); // 게시글 ID
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.getpost;
        setPost(res.data);
      } catch (e) {
        console.error("게시글 불러오기에 실패 하였습니다." + e);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postId]);

  if (loading) return <div className="loading">글을 불러오는 중...</div>;
  if (!post) return <div className="fail">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="container">
      <h1 className="post_title">{post.title}</h1>
      <div className="post_writer">
        작성자: {post.writer} | {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="post_content">{post.content}</div>
      <button
        onClick={() => navigate(-1)} // 이전 페이지로 이동
        className="btn_back"
      >
        목록으로
      </button>
    </div>
  );
};

export default Post;
