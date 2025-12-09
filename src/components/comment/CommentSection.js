import { useEffect, useState, useContext, useRef } from "react";
import CommentApi from "../../api/CommentApi";
import "../../styles/CommentSection.css";
import { UserContext } from "../../context/UserContext";
import styled from "styled-components";
import profileDefaultImg from "../../images/profileDefaultImg.png";
import { useNavigate, useParams } from "react-router-dom";
const ProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

function CommentSection({ postId }) {
  const { teamId } = useParams();
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRefs = useRef({});

  const loginUserEmail = localStorage.getItem("email");

  const fetchComments = async () => {
    try {
      const res = await CommentApi.getComments(postId, page, 5);
      setComments(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("피드백 목록 불러오기 실패:", err);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await CommentApi.createComment(postId, content);
      setContent("");
      setPage(0);
      fetchComments();
    } catch (err) {
      console.error("피드백 작성 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("피드백을 삭제하시겠습니까?")) return;
    try {
      await CommentApi.deleteComment(id);
      setMenuOpenId(null);
      fetchComments();
    } catch (err) {
      console.error("피드백 삭제 실패:", err);
    }
  };

  const startEdit = (id, currentContent) => {
    setEditingId(id);
    setEditContent(currentContent);
    setMenuOpenId(null);
  };

  const handleEditSubmit = async (id) => {
    if (!editContent.trim()) return;
    try {
      await CommentApi.updateComment(id, editContent);
      setEditingId(null);
      setEditContent("");
      fetchComments();
    } catch (err) {
      console.error("피드백 수정 실패:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".menu-icon")) return;
      if (menuOpenId === null) return;

      const currentMenu = menuRefs.current[menuOpenId];

      // 메뉴 ref가 존재하고, 클릭한 부분이 그 안이 아니면 닫기
      if (currentMenu && !currentMenu.contains(e.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenId]);
  return (
    <div className="comment-container">
      <h2 className="comment-title">피드백 {comments.length}</h2>

      <div className="comment-input-box">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="피드백을 입력하세요."
        />
        <button className="comment-submit" onClick={handleSubmit}>
          등록
        </button>
      </div>

      {/* 피드백 리스트 */}
      <ul className="comment-list">
        {comments.map((c) => {
          const isOwner = c.userEmail === loginUserEmail;

          return (
            <li key={c.id} className="comment-item">
              <div className="comment-header">
                {/* 아바타 + 정보 */}
                <div className="comment-header-left">
                  <ProfileImg
                    onClick={() =>
                      navigate(`/team/${teamId}/userprofile/${c.writerId}`)
                    }
                    src={
                      c?.writerImage && c.writerImage.trim() !== ""
                        ? c.writerImage
                        : profileDefaultImg
                    }
                    alt="프로필"
                  />
                  <div className="comment-info">
                    <span
                      className="comment-writer"
                      onClick={() =>
                        navigate(`/team/${teamId}/userprofile/${c.writerId}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {c.userName}
                    </span>
                    <span className="comment-date">
                      {formatDateTime(c.createTime)}
                    </span>
                  </div>
                </div>

                {/* 점3개 메뉴 - 작성자만 보임 */}
                {isOwner && editingId !== c.id && (
                  <div className="comment-menu">
                    <button
                      className="menu-icon"
                      onClick={() =>
                        setMenuOpenId((prev) => (prev === c.id ? null : c.id))
                      }
                    >
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>

                    {menuOpenId === c.id && (
                      <div
                        className="dropdown"
                        ref={(el) => (menuRefs.current[c.id] = el)}
                      >
                        <button onClick={() => startEdit(c.id, c.content)}>
                          수정
                        </button>
                        <button onClick={() => handleDelete(c.id)}>삭제</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {editingId === c.id ? (
                <>
                  <textarea
                    className="edit-input"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="comment-ops">
                    <button onClick={() => handleEditSubmit(c.id)}>저장</button>
                    <button onClick={() => setEditingId(null)}>취소</button>
                  </div>
                </>
              ) : (
                <p className="comment-text">{c.content}</p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          ◀
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
