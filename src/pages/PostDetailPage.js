// PostDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostApi from "../api/PostApi";
import CommentSection from "../components/comment/CommentSection";
import "../styles/PostDetailPage.css";
import styled from "styled-components";

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [EditMenuOpen, setEditMenuOpen] = useState(false);
  const loginUserEmail = localStorage.getItem("email");

  const isOwner = post?.userEmail === loginUserEmail;

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await PostApi.getPostDetail(postId);
        console.log("상세 조회 데이터:", res.data);
        setPost(res.data);
      } catch (err) {
        console.error("게시물 조회 실패:", err);
      }
    };
    fetchPostDetail();
  }, [postId]);

  const isImage = (fileName = "") => {
    return /\.(png|jpg|jpeg|gif)$/i.test(fileName);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = post.fileUrl;
    link.download = post.fileName;
    link.click();
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await PostApi.deletePost(postId);
      alert("삭제되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };
  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
    <div className="post-detail-container">
      {/* 제목 + 뒤로가기 한 줄 */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="post-title">{post?.title}</h1>
      <div className="post-info">
        <div className="post-writer">
          {/* 프로필 이미지 */}
          {post?.writerImage ? (
            <ProfileImg src={post.writerImage} />
          ) : (
            <span className="material-symbols-outlined">account_circle</span>
          )}
          <span className="writer">{post?.userName}</span>
        </div>
        <div className="post-right">
          {isOwner && (
            <button
              className="menu-icon"
              onClick={() => setEditMenuOpen((prev) => !prev)}
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          )}
          {EditMenuOpen && (
            <div className="dropdown">
              <button onClick={handleEdit}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
          <div className="post-date-row">
            <span className="date">{formatDateTime(post?.createTime)}</span>
          </div>
        </div>
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
              <p>
                <a
                  href={post.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="file-link"
                >
                  원본 이미지 보기
                </a>
              </p>
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
