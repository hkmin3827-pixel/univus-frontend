import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostApi from "../api/PostApi";
import CommentSection from "../components/comment/CommentSection";
import "../styles/PostDetailPage.css";

function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const fetchPostDetail = async () => {
    try {
      const res = await PostApi.getPostDetail(postId);
      console.log("상세 조회 데이터:", res.data);
      setPost(res.data);
    } catch (err) {
      console.error("게시물 조회 실패:", err);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="post-title">{post?.title}</h1>
      </div>

      <div className="post-info">
        <span className="writer">{post?.userName}</span>
        <span className="date">{formatDateTime(post?.createTime)}</span>
      </div>

      <hr />

      <div className="post-content">{post?.content}</div>

      {post?.fileUrl && (
        <div className="image-box">
          <img src={post.fileUrl} alt="첨부파일" style={{ maxWidth: "100%" }} />
        </div>
      )}

      <hr />

      <CommentSection postId={postId} />
    </div>
  );
}

export default PostDetailPage;
