import { useEffect, useState } from "react";
import CommentApi from "../../api/CommentApi";
import "../../styles/CommentSection.css";

function CommentSection({ postId }) {
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    try {
      const res = await CommentApi.getComments(postId, page, 10);
      setComments(res.data.content); // 이미 최신순 정렬됨
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
      setPage(0); // 최신 댓글 보이도록 첫 페이지 이동
      fetchComments();
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <div className="comment-section">
      <h2>댓글 {comments.length}</h2>

      <div className="comment-input-section">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleSubmit}>등록</button>
      </div>

      <div className="comment-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-box">
            <div className="comment-header">
              <span className="writer">{c.userName}</span>
              <span className="date">{c.createTime}</span>
            </div>
            <p className="content">{c.content}</p>
          </div>
        ))}
      </div>

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
