// NoticeCreatePage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../api/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeWrite from "../../components/notice/NoticeWrite";
import styled from "styled-components";
import { TeamContext } from "../../context/TeamContext";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const NoticeCreatePage = () => {
  const navigate = useNavigate();
  const { selectedTeam } = useContext(TeamContext);

  const [notice, setNotice] = useState({
    title: "",
    content: "",
    teamId: null,
    file: null,
    fileUrl: null,
    fileName: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (selectedTeam)
      setNotice((prev) => ({ ...prev, teamId: selectedTeam.id }));
  }, [selectedTeam]);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNotice((prev) => ({ ...prev, file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Firebase v9 업로드
  const handleUploadClick = async () => {
    if (!notice.file) return;

    try {
      const fileRef = ref(storage, `notice/${Date.now()}_${notice.file.name}`);

      await uploadBytes(fileRef, notice.file);
      const url = await getDownloadURL(fileRef);

      setNotice((prev) => ({
        ...prev,
        fileUrl: url,
        fileName: notice.file.name,
      }));

      alert("파일 업로드 완료!");
    } catch (err) {
      console.error(err);
      alert("파일 업로드 실패");
    }
  };

  // 제출
  const handleSubmit = async () => {
    if (!notice.title.trim() || !notice.content.trim() || !notice.teamId) {
      alert("제목, 내용, 팀을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await NoticeApi.createNotice({
        title: notice.title,
        content: notice.content,
        teamId: notice.teamId,
        fileUrl: notice.fileUrl,
        fileName: notice.fileName,
      });

      alert("공지사항 등록 완료");
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
        previewUrl={previewUrl}
        onFileChange={handleFileChange}
        onUploadClick={handleUploadClick}
        onSubmit={handleSubmit}
      />
    </PageWrapper>
  );
};

export default NoticeCreatePage;
