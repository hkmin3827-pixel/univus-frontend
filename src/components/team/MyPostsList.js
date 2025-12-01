// src/components/team/MyPostsList.jsx
import React, { useEffect, useState } from "react";
import PostApi from "../../api/PostApi"; // API 위치에 맞게 수정
import "../../styles/MyPostsList.css";
import { useNavigate } from "react-router-dom";

function MyPostsList({ posts }) {
  const navigate = useNavigate();
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };
  const handleClick = (postId) => {
    navigate(`/post/detail/${postId}`);
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
            onClick={() => handleClick(item.id)}
            style={{ cursor: "pointer" }}
          >
            <p className="title">{item.title}</p>
            <p className="date">{formatDateTime(item.createTime)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyPostsList;
