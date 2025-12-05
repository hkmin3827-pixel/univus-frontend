// NoticeEditPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../../api/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeWrite from "../../components/notice/NoticeWrite";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const NoticeEditPage = () => {
  const { noticeId, teamId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [notice, setNotice] = useState({
    title: "",
    content: "",
    file: null,
    fileUrl: null,
    fileName: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  // 권한 체크
  useEffect(() => {
    if (user.role && user.role !== "PROFESSOR") {
      alert("공지사항 수정 권한이 없습니다.");
      navigate(`/team/${teamId}/notice`);
      return;
    }
  }, [user.role, navigate]);

  // 기존 공지사항 불러오기
  useEffect(() => {
    const loadNotice = async () => {
      try {
        const res = await NoticeApi.getNotice(teamId, noticeId);
        setNotice(res.data);
      } catch (e) {
        const message =
          e.response?.data?.message ||
          e.response?.data ||
          "공지사항 불러오기에 실패하였습니다.";

        alert(message);
        navigate(`/team/${teamId}/notice`);
      }
    };
    loadNotice();
  }, [teamId, noticeId, navigate]);

  // 파일 선택
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNotice((prev) => ({ ...prev, file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Firebase 업로드
  const handleUploadClick = async () => {
    if (!notice.file) return alert("파일을 선택해주세요.");

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

  // 제출 (수정)
  const handleSubmit = async () => {
    if (!notice.title.trim() || !notice.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // 파일 선택 후 업로드 안 했을 경우
    if (notice.file && !notice.fileUrl) {
      return alert("파일을 업로드한 뒤 수정해주세요.");
    }

    try {
      await NoticeApi.updateNotice(teamId, noticeId, {
        title: notice.title,
        content: notice.content,
        fileUrl: notice.fileUrl,
        fileName: notice.fileName,
      });

      alert("공지사항 수정 완료");
      navigate(`/team/${teamId}/notice/detail/${noticeId}`);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "공지사항 수정에 실패했습니다.";
      alert(message);
    }
  };

  if (!notice) return <div>Loading...</div>;

  return (
    <PageWrapper>
      <NoticeWrite
        notice={notice}
        setNotice={setNotice}
        previewUrl={previewUrl}
        onFileChange={handleFileChange}
        onUploadClick={handleUploadClick} // Create 페이지와 동일하게 업로드 버튼
        onSubmit={handleSubmit}
        editMode={true}
        onCancel={() => navigate(`/team/${teamId}/notice/detail/${noticeId}`)}
      />
    </PageWrapper>
  );
};

export default NoticeEditPage;
