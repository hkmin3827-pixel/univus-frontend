import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import "../styles/BoardPage.css";

function BoardPage() {
  const { boardId } = useParams();
  const [boardInfo, setBoardInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await AxiosApi.getboard(boardId);
        setBoardInfo(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBoard();
  }, [boardId]);

  return (
    <div className="board-page-container">
      {/* 🔹 상단 Banner */}
      <div className="board-banner">
        <div className="banner-label">NEW</div>
        <h1 className="board-title">{boardInfo?.name || "게시판"}</h1>
      </div>

      {/* 🔹 게시글 작성 버튼 */}
      <div className="board-actions">
        <button className="new-post-btn">+ 새 게시글 작성</button>
      </div>

      {/* 🔹 게시글 리스트 */}
      <h2 className="section-title">게시글 목록</h2>

      {posts.length === 0 ? (
        <div className="empty-box">
          <img src="/empty.svg" alt="empty" />
          <p>등록된 게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 80)}...</p>
              <div className="post-meta">
                <span>{post.writer}</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Floating 버튼 */}
      <button className="floating-btn">＋</button>
    </div>
  );
}

export default BoardPage;
