import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoticeWrite from "../../components/notice/NoticeWrite";
import * as NoticeApi from "../../api/NoticeApi";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f3f4ff;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`;

const NoticeEditPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (role !== "PROFESSOR") {
      alert("공지사항 수정 권한이 없습니다.");
      navigate("/notice");
      return;
    }

    const load = async () => {
      try {
        const res = await NoticeApi.getNotice(noticeId);
        setNotice(res.data);
      } catch {
        alert("공지사항 조회 실패");
        navigate("/notice");
      }
    };
    load();
  }, []);

  const handleSubmit = async () => {
    if (!notice.title.trim() || !notice.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await NoticeApi.updateNotice(noticeId, notice);
      alert("공지사항이 수정되었습니다.");
      navigate(`/notice/detail/${noticeId}`);
    } catch {
      alert("수정 실패");
    }
  };

  if (!notice) return <div>Loading...</div>;

  return (
    <PageWrapper>
      <NoticeWrite
        notice={notice}
        setNotice={setNotice}
        onSubmit={handleSubmit}
        editMode={true}
        onCancel={() => navigate(`/notice/detail/${noticeId}`)}
      />
    </PageWrapper>
  );
};

export default NoticeEditPage;
