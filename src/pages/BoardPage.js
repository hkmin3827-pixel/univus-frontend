import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostApi from "../api/PostApi";
import { TeamContext } from "../context/TeamContext";
import "../styles/BoardPage.css";

function BoardPage() {
  const { boardId } = useParams();
  const { selectedTeam } = useContext(TeamContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const isImageFile = (fileUrl) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileUrl);
  };

  const fetchPosts = async () => {
    try {
      const res = await PostApi.getPostList(boardId, page, 10);
      console.log("게시글 목록:", res.data); // 확인용
      setPosts(res.data.content ?? []);
      setTotalPages(res.data.totalPages ?? 1);
    } catch (err) {
      console.error("게시글 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [boardId, page]);

  return (
    <div className="board-page-container">
      {/* 제목 & 버튼 */}
      <div className="board-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="board-title">📁 {selectedTeam?.name} 프로젝트</h1>

        <button
          className="new-post-btn"
          onClick={() => navigate(`/post/create/${boardId}`)}
        >
          + 새 게시물
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="post-list">
        {posts.length === 0 ? (
          <p className="empty">게시글이 없습니다. 첫 글을 작성해보세요.</p>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              className="post-card"
              onClick={() => navigate(`/post/detail/${p.id}`)}
            >
              <h3>{p.title}</h3>
              <p>{p.content?.slice(0, 80) ?? ""}...</p>
              {p.fileUrl &&
                (isImageFile(p.fileUrl) ? (
                  <img
                    src={p.fileUrl}
                    alt="첨부 이미지"
                    className="thumbnail"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="file-preview">📎 첨부파일 있음</div>
                ))}
              <span className="writer">{p.userName}</span>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
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

export default BoardPage;
