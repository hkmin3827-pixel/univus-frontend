// 게시판 페이지

import { useEffect, useState } from "react";
import axios from "../api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";

// 백엔드 응답 : ex) GET /api/boards/{boardId}

const Board = () => {
  const { boardId } = useParams(); // URL에서 boardId 추출
  const [boardName, setBoardName] = useState("");
  const [board, setBoard] = useState("");
  const [posts, setPosts] = useState([]); // 게시물 배열
  const [loading, setLoading] = useState(true); // 페이지가 로딩 중인지
  const navigate = useNavigate();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await axios.getboard; // 게시판 + 게시글 목록 가져오는 백엔드 api*******추후 수정?
        setPosts(res.data.posts);
        setBoardName(res.data.boardName);
      } catch (e) {
        console.error("게시글 목록을 가져오는 데 실패하였습니다." + e);
      } finally {
        setLoading(false);
      }
    };
    getBoard();
  }, []); // 마운팅 시점

  if (loading) return <div className="loading">게시글을 불러 오는 중...</div>;

  return (
    <div className="container">
      <h1 className="prj_name">프로젝트</h1>
      <h2>{boardName}</h2>

      {posts.length === 0 ? (
        <p className="empty">텅 비었습니다...</p>
      ) : (
        <table className="board_posts">
          <thead>
            <tr className="post">
              <th className="post_id">번호</th>
              <th className="post_title">제목</th>
              <th className="post_writer">작성자</th>
              <th className="post_date">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-50 cursor-pointer border-b"
                onClick={() => navigate(`/posts/${post.id}`)} // 상세 페이지 이동******api 추후 수정
              >
                <td className="post">{post.id}</td>
                <td className="post">{post.title}</td>
                <td className="post">{post.writer}</td>
                <td className="post">
                  {new Date(post.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Board;
