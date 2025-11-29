// PostDetailPage.jsx
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
  // 📌 파일 확장자 확인 함수
  const isImage = (fileName = "") => {
    return /\.(png|jpg|jpeg|gif)$/i.test(fileName);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = post.fileUrl;
    link.download = post.fileName;
    link.click();
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };

  return (
    <div className="post-detail-container">
      {/* 제목 + 뒤로가기 한 줄 */}
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

      {post?.fileUrl && post?.fileName && (
        <div className="file-box">
          {isImage(post.fileName) ? (
            <div className="image-preview">
              <img
                src={post.fileUrl}
                alt="첨부 이미지"
                style={{
                  maxWidth: "50%",
                  borderRadius: "10px",
                  marginTop: "14px",
                }}
              />
              <a
                href={post.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="file-link"
              >
                원본 이미지 보기
              </a>
            </div>
          ) : (
            <div>
              <span style={{ fontWeight: "600" }}>첨부파일:&nbsp;</span>
              <button
                onClick={handleDownload}
                className="file-download-btn"
                style={{
                  color: "#5566ff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  textDecoration: "underline",
                }}
              >
                {post.fileName}
              </button>
            </div>
          )}
        </div>
      )}

      <hr />

      <CommentSection postId={postId} />
    </div>
  );
}

export default PostDetailPage;
