import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostApi from "../api/PostApi";
import "../styles/BoardPage.css";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
const ProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

function BoardPage() {
  const { boardId, teamId } = useParams();
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const isImageFile = (fileUrl) => {
    const cleanedUrl = fileUrl.split("?")[0];
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(cleanedUrl);
  };

  useEffect(() => {
    const fetchBoardName = async () => {
      try {
        const res = await AxiosApi.getBoard(teamId, boardId);
        setBoardName(res.data.name);
        setBoardDescription(res.data.description);
      } catch (err) {
        console.error("게시판 정보 불러오기 실패:", err);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await PostApi.getPostList(boardId, page, 7);
        console.log("게시글 목록:", res.data); // 확인용
        setPosts(res.data.content ?? []);
        setTotalPages(res.data.totalPages ?? 1);
      } catch (err) {
        console.error("게시글 목록 불러오기 실패:", err);
      }
    };
    fetchBoardName();
    fetchPosts();
  }, [boardId, page]);

  return (
    <div className="board-page-container">
      {/* 제목 & 버튼 */}
      <div className="board-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <button
          className="new-post-btn"
          onClick={() => navigate(`/post/create/${boardId}`)}
        >
          + 새 게시물
        </button>
      </div>

      <div className="board-info">
        <h1 className="board-title">{boardName}</h1>
        <p className="board-description">{boardDescription}</p>
      </div>
      <hr className="divider" />
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
                  <div className="file-preview">📎 첨부파일</div>
                ))}
              <div className="post-writer">
                {/* 프로필 이미지 */}
                {p.writerImage && p.writerImage.trim() !== "" ? (
                  <ProfileImg src={p.writerImage} alt="프로필" />
                ) : (
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                )}
                <span className="writer">{p.userName}</span>
              </div>
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
