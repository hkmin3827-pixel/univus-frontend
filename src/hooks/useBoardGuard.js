// src/hooks/useBoardGuard.js
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardApi from "../api/BoardApi";

export default function useBoardGuard() {
  const navigate = useNavigate();
  const { teamId, boardId } = useParams();

  useEffect(() => {
    const validate = async () => {
      try {
        await BoardApi.getBoardsByTeam(teamId);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          "게시판 접근 권한이 없습니다.";

        alert(message);
        navigate(`/team/${teamId}`);
      }
    };

    validate();
  }, [teamId, boardId]);
}
