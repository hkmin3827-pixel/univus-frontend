import React, { useEffect, useState } from "react";
import CommentApi from "../../api/CommentApi";
import "../../styles/MyPostsList.css";
import { useNavigate, useParams } from "react-router-dom";

function MyCommentsList({ comments }) {
  const navigate = useNavigate();
  const { teamId } = useParams();
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
      <h3>💬 내가 작성한 피드백</h3>
      {comments.length === 0 ? (
        <p className="empty">작성한 피드백이 없습니다.</p>
      ) : (
        comments.map((item) => (
          <div
            key={item.id}
            className="team-list-item"
            onClick={() => handleClick(item.boardId, item.postId)}
            style={{ cursor: "pointer" }}
          >
            <p className="title">
              {item.content && item.content.length > 10
                ? item.content.slice(0, 40) + "..."
                : item.content}
            </p>
            <p className="date">{formatDateTime(item.createTime)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCommentsList;
