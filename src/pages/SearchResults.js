import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

const SearchResults = () => {
  const location = useLocation();

  const [keyword, setKeyword] = useState("");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 🔁 URL query 변경 시 keyword state 업데이트
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const k = queryParams.get("keyword") || "";
    setKeyword(k);
    setPage(0); // 새로운 검색어가 들어오면 페이지 초기화
  }, [location.search]);

  // 🔍 검색 결과 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      if (!keyword) return; // 검색어 없으면 요청 안 함

      try {
        const data = await AxiosApi.searchComments(keyword, page, 10);

        console.log("검색 응답:", data); // 확인용, 필요 없으면 지워도 됨

        const content = data.content || [];
        const total = data.totalPages || 1;

        setComments(content);
        setTotalPages(total);
      } catch (err) {
        console.error("검색 요청 에러:", err);
        setComments([]);
        setTotalPages(1);
      }
    };

    fetchComments();
  }, [keyword, page]);

  return (
    <div style={{ padding: "24px 32px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
        검색 결과: {keyword}
      </h2>

      {comments.length === 0 && (
        <p style={{ color: "#666", marginBottom: "16px" }}>
          검색 결과가 없습니다.
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>{comment.userName}</strong>: {comment.content}
            <br />
            <small style={{ color: "#999" }}>
              {comment.createTime
                ? new Date(comment.createTime).toLocaleString()
                : ""}
            </small>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          이전
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
