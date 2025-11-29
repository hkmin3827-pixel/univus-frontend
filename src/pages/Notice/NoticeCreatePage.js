import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeWrite from "../../components/notice/NoticeWrite";

const NoticeCreatePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // 권한 확인
  const [notice, setNotice] = useState({ title: "", content: "" });

  useEffect(() => {
    if (role !== "PROFESSOR") {
      alert("공지사항 작성 권한이 없습니다.");
      navigate("/notice");
    }
  }, [role, navigate]);

  const handleSubmit = async () => {
    if (!notice.title.trim() || !notice.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await NoticeApi.createNotice(notice);
      if (res.data && res.data.id) {
        alert("공지사항이 등록되었습니다.");
        navigate(`/notice/detail/${res.data.id}`);
      } else {
        alert("공지사항 등록 실패: ID를 확인할 수 없습니다.");
      }
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
