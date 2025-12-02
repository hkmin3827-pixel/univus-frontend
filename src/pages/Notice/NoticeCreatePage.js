import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeWrite from "../../components/notice/NoticeWrite";
import styled from "styled-components";
import { TeamContext } from "../../context/TeamContext";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
  background: #f3f4ff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const NoticeCreatePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const { selectedTeam } = useContext(TeamContext);

  const [notice, setNotice] = useState({
    title: "",
    content: "",
    teamId: null,
  });

  useEffect(() => {
    if (selectedTeam) {
      setNotice((prev) => ({ ...prev, teamId: selectedTeam.id }));
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (role !== "PROFESSOR") {
      alert("공지사항 작성 권한이 없습니다.");
      navigate("/notice");
    }
  }, [role, navigate]);

  const handleSubmit = async () => {
    if (!notice.title.trim() || !notice.content.trim() || !notice.teamId) {
      alert("제목, 내용, 팀을 모두 선택해주세요.");
      return;
    }

    try {
      const res = await NoticeApi.createNotice(notice);
      alert("공지사항이 등록되었습니다.");
      navigate(`/notice/detail/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("공지사항 등록 실패");
    }
  };

  return (
    <PageWrapper>
      <NoticeWrite
        notice={notice}
        setNotice={setNotice}
        onSubmit={handleSubmit}
        editMode={false}
        selectedTeam={selectedTeam}
      />
    </PageWrapper>
  );
};

export default NoticeCreatePage;
