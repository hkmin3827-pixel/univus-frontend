// NoticeWrite.jsx
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 24px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: 0.2s;

  &:focus {
    border-color: #5f5fff;
    box-shadow: 0 0 0 2px rgba(95, 95, 255, 0.2);
    outline: none;
  }
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  height: 240px;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  margin-bottom: 24px;
  transition: 0.2s;

  &:focus {
    border-color: #5f5fff;
    box-shadow: 0 0 0 2px rgba(95, 95, 255, 0.2);
    outline: none;
  }
`;

const FileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const FileLabel = styled.label`
  cursor: pointer;
  color: #5f5fff;
  font-weight: 600;
  font-size: 0.95rem;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  background-color: #5f5fff;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PreviewImage = styled.img`
  max-width: 50%;
  border-radius: 10px;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  padding: 12px 28px;
  background: #5f5fff;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.85;
  }
`;

const CancelButton = styled(SubmitButton)`
  background: #b5b5b5;
`;

const NoticeWrite = ({
  notice,
  setNotice,
  previewUrl,
  onFileChange,
  onUploadClick,
  onSubmit,
  onCancel,
}) => {
  return (
    <Card>
      <Title>공지사항 작성</Title>

      <TitleInput
        placeholder="제목을 입력하세요"
        value={notice.title}
        onChange={(e) => setNotice({ ...notice, title: e.target.value })}
      />

      <ContentTextArea
        placeholder="내용을 입력하세요"
        value={notice.content}
        onChange={(e) => setNotice({ ...notice, content: e.target.value })}
      />

      <FileSection>
        <FileLabel>
          📎 파일 선택
          <input type="file" hidden onChange={onFileChange} />
        </FileLabel>

        {previewUrl && <PreviewImage src={previewUrl} alt="미리보기" />}

        <UploadButton disabled={!notice.file} onClick={onUploadClick}>
          Upload
        </UploadButton>
      </FileSection>

      <ButtonGroup>
        <SubmitButton onClick={onSubmit}>등록</SubmitButton>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </ButtonGroup>
    </Card>
  );
};

export default NoticeWrite;
