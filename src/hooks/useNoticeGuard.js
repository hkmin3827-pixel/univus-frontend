// src/hooks/useNoticeGuard.js
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as NoticeApi from "../api/NoticeApi";

export default function useNoticeGuard() {
  const navigate = useNavigate();
  const { teamId, noticeId } = useParams();

  useEffect(() => {
    const validate = async () => {
      try {
        await NoticeApi.getNotice(teamId, noticeId);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          "공지 조회 권한이 없습니다.";

        alert(message);
        navigate(`/team/${teamId}/notice`);
      }
    };

    validate();
  }, [teamId, noticeId]);
}
