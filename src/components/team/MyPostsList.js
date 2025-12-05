// src/components/team/MyPostsList.jsx
import React, { useEffect, useState } from "react";
import "../../styles/MyPostsList.css";
import { useNavigate, useParams } from "react-router-dom";

function MyPostsList({ posts }) {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };
  const handleClick = (boardId, postId) => {
    navigate(`/team/${teamId}/board/${boardId}/post/detail/${postId}`);
  };

  return (
    <div className="team-list-box">
      <h3>📝 내가 작성한 리포트</h3>
      {posts.length === 0 ? (
        <p className="empty">작성한 리포트가 없습니다.</p>
      ) : (
        posts.map((item) => (
          <div
            key={item.id}
            className="team-list-item"
            onClick={() => handleClick(item.boardId, item.id)}
            style={{ cursor: "pointer" }}
          >
            <p className="title">
              {item.title && item.title.length > 10
                ? item.title.slice(0, 40) + "..."
                : item.title}
            </p>
            <p className="date">{formatDateTime(item.createTime)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyPostsList;
