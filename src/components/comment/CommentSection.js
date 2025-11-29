import { useEffect, useState } from "react";
import CommentApi from "../../api/CommentApi";
import "../../styles/CommentSection.css";

function CommentSection({ postId }) {
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const loginUserEmail = localStorage.getItem("email");

  const fetchComments = async () => {
    try {
      const res = await CommentApi.getComments(postId, page, 5);
      setComments(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
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
      console.error("댓글 작성 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await CommentApi.deleteComment(id);
      setMenuOpenId(null);
      fetchComments();
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
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
      console.error("댓글 수정 실패:", err);
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

  return (
    <div className="comment-container">
      <h2 className="comment-title">댓글 {comments.length}</h2>

      <div className="comment-input-box">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요."
        />
        <button className="comment-submit" onClick={handleSubmit}>
          등록
        </button>
      </div>

      {/* 댓글 리스트 */}
      <ul className="comment-list">
        {comments.map((c) => {
          const isOwner = c.userEmail === loginUserEmail;

          return (
            <li key={c.id} className="comment-item">
              <div className="comment-header">
                {/* 아바타 + 정보 */}
                <div className="comment-header-left">
                  <div className="avatar">{c.userName?.charAt(0)}</div>
                  <div className="comment-info">
                    <span className="comment-writer">{c.userName}</span>
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
                      <div className="dropdown">
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
