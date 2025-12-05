// src/hooks/usePostGuard.js
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostApi from "../api/PostApi";

export default function usePostGuard() {
  const navigate = useNavigate();
  const { teamId, boardId, postId } = useParams();

  useEffect(() => {
    const validate = async () => {
      try {
        await PostApi.getPostDetail(teamId, boardId, postId);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          "게시글 조회 권한이 없습니다.";

        alert(message);
        navigate(`/team/${teamId}/board/${boardId}`);
      }
    };

    validate();
  }, [teamId, boardId, postId]);
}
