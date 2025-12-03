// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { TeamContext } from "../context/TeamContext";
import "../styles/SearchResultsPage.css";
import AxiosApi from "../api/AxiosApi";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchResultsPage() {
  const { selectedTeam } = useContext(TeamContext);
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [notices, setNotices] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");
  useEffect(() => {
    if (!selectedTeam || !keyword) return;
    fetchSearchResults();
  }, [selectedTeam, keyword]);

  const fetchSearchResults = async () => {
    try {
      const res = await AxiosApi.search(selectedTeam.id, keyword);
      setPosts(res.data.posts);
      setComments(res.data.comments);
      setNotices(res.data.notices);
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  const highlightText = (text, keyword, length = 20) => {
    if (!text) return "";
    if (!keyword)
      return text.slice(0, length) + (text.length > length ? "..." : "");

    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    const index = lowerText.indexOf(lowerKeyword);

    // 키워드가 없으면 글 앞 20자
    if (index === -1) {
      const preview = text.slice(0, length);
      return preview + (text.length > length ? "..." : "");
    }

    const start = Math.max(0, index - 10);
    const end = Math.min(text.length, index + keyword.length + 10);

    const prefix = start > 0 ? "..." : "";
    const suffix = end < text.length ? "..." : "";

    return (
      prefix +
      text.slice(start, index) +
      `<b>${text.slice(index, index + keyword.length)}</b>` +
      text.slice(index + keyword.length, end) +
      suffix
    );
  };

  return (
    <div className="search-container">
      <h2 className="search-title">🔍 검색 결과: "{keyword}"</h2>

      <div className="results-grid">
        {/* 게시글 */}
        <div className="result-box">
          <h3>📝 리포트</h3>
          <hr className="divider" />
          <div className="result-box-content">
            {posts.length === 0 ? (
              <p className="empty">검색된 리포트가 없습니다.</p>
            ) : (
              posts.map((item) => (
                <div
                  key={item.id}
                  className="result-item"
                  onClick={() =>
                    navigate(
                      `/team/${teamId}/board/${item.boardId}/post/detail/${item.postId}`
                    )
                  }
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.title, keyword, 20),
                    }}
                  />
                  <p
                    className="item-content"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.content, keyword, 40),
                    }}
                  />
                  <p className="item-writer">{item.name}</p>
                  <div className="item-meta">
                    <span className="item-date">
                      {item.createTime?.split("T")[0]}
                    </span>
                    <span className="item-board">{item.boardName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 댓글 */}
        <div className="result-box">
          <h3>💬 피드백</h3>
          <hr className="divider" />
          <div className="result-box-content">
            {comments.length === 0 ? (
              <p className="empty">검색된 피드백이 없습니다.</p>
            ) : (
              comments.map((item) => (
                <div
                  key={item.id}
                  className="result-item"
                  onClick={() =>
                    navigate(
                      `/team/${teamId}/board/${item.boardId}/post/detail/${item.postId}`
                    )
                  }
                >
                  <p
                    className="item-title"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.content, keyword, 40),
                    }}
                  />
                  <p className="item-writer">{item.userName}</p>
                  <div className="item-meta">
                    <span className="item-date">
                      {item.createTime?.split("T")[0]}
                    </span>
                    <span className="item-board">{item.boardName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 공지사항 */}
        <div className="result-box">
          <h3>📢 공지사항</h3>
          <hr className="divider" />
          <div className="result-box-content">
            {notices.length === 0 ? (
              <p className="empty">검색된 공지사항이 없습니다.</p>
            ) : (
              notices.map((item) => (
                <div
                  key={item.id}
                  className="result-item"
                  onClick={() => navigate(`/notice/detail/${item.id}`)}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.title, keyword, 20),
                    }}
                  />
                  <p
                    className="item-content"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.content, keyword, 40),
                    }}
                  />
                  <p className="item-writer">{item.writerName}</p>
                  <p className="item-date">{item.createTime?.split("T")[0]}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
