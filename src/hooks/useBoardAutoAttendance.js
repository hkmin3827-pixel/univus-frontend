// src/hooks/useBoardAutoAttendance.js
import { useEffect } from "react";
import AxiosApi from "../api/AxiosApi";

const useBoardAutoAttendance = (boardId) => {
  useEffect(() => {
    if (!boardId) return;

    const checkIn = async () => {
      try {
        await AxiosApi.checkInAttendance(boardId);
        // 굳이 alert 안 띄우고 조용히 성공만
        console.log("✅ 자동 출석 완료:", boardId);
      } catch (err) {
        console.error("❌ 자동 출석 실패:", err);
        // 401/403 나면 로그인 페이지로 보내거나 해도 됨
      }
    };

    checkIn();
  }, [boardId]);
};

export default useBoardAutoAttendance;
