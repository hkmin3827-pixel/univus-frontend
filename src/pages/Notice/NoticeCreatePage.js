// 공지사항 생성 페이지
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi"; // API 경로 확인
import NoticeWrite from "../../components/notice/NoticeWrite";

const NoticeCreatePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // 교수 권한 확인

  const [notice, setNotice] = useState({ title: "", content: "" });

  useEffect(() => {
    if (role !== "PROFESSOR") {
      alert("공지사항 작성 권한이 없습니다.");
      navigate("/notice"); // 권한 없으면 목록 페이지로 이동
    }
  }, [role, navigate]);

  const handleSubmit = async () => {
    if (!notice.title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    try {
      const res = await NoticeApi.createNotice(notice);
      alert("공지사항이 등록되었습니다.");
      navigate(`/notice/detail/${res.data}`); // 생성된 공지 상세 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("공지사항 등록 실패");
    }
  };

  return (
    <NoticeWrite
      notice={notice}
      setNotice={setNotice}
      onSubmit={handleSubmit}
    />
  );
};

export default NoticeCreatePage;
