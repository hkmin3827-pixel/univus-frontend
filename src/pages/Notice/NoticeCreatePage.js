// NoticeCreatePage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../api/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeWrite from "../../components/notice/NoticeWrite";
import styled from "styled-components";
import { TeamContext } from "../../context/TeamContext";
import { UserContext } from "../../context/UserContext";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 939px) {
    & {
      padding: 20px;
      min-height: 100%;
    }
  }
`;

const NoticeCreatePage = () => {
  const navigate = useNavigate();
  const { selectedTeam } = useContext(TeamContext);
  const { teamId } = useParams();
  const { user } = useContext(UserContext);

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
    if (user.role && user.role !== "PROFESSOR") {
      alert("공지사항 작성 권한이 없습니다.");
      navigate(`/team/${teamId}/notice`); // 이전 페이지로
    }
  }, [user.role, navigate]);
  useEffect(() => {
    if (selectedTeam)
      setNotice((prev) => ({ ...prev, teamId: selectedTeam.id }));
  }, [selectedTeam]);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNotice((prev) => ({ ...prev, file }));
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null); // PDF는 미리보기 이미지 없음
    }
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

    let fileUrl = notice.fileUrl;
    let fileName = notice.fileName;

    // 업로드가 안되어 있으면 즉시 업로드
    if (notice.file && !notice.fileUrl) {
      const fileRef = ref(storage, `notice/${Date.now()}_${notice.file.name}`);
      await uploadBytes(fileRef, notice.file);
      fileUrl = await getDownloadURL(fileRef);
      fileName = notice.file.name;

      // 🔥 상태에 반영
      setNotice((prev) => ({
        ...prev,
        fileUrl,
        fileName,
      }));
    }
    try {
      const res = await NoticeApi.createNotice(teamId, {
        title: notice.title,
        content: notice.content,
        teamId: notice.teamId,
        fileUrl,
        fileName,
      });

      alert("공지사항 등록 완료");
      navigate(`/team/${teamId}/notice/detail/${res.data.id}`);
      console.log("create response: ", res.data);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "공지사항 작성에 실패하였습니다.";

      alert(message);
    }
  };

  const handleCancel = () => {
    navigate(`/team/${teamId}/notice`); // 이전 페이지로 이동
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
        onCancel={handleCancel}
      />
    </PageWrapper>
  );
};

export default NoticeCreatePage;
