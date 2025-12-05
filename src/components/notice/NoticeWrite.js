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
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background: #5f5fff;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  min-width: 100px;
  white-space: nowrap;
`;

const CancelButton = styled(SubmitButton)`
  background: #b5b5b5;
`;

const ExistingFileBox = styled.div`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fafafa;
`;

const PreviewImage = styled.img`
  max-width: 50%;
  border-radius: 10px;
`;

const FileRemoveButton = styled.button`
  background: #ff4e4e;
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
`;

const NoticeWrite = ({
  notice,
  setNotice,
  previewUrl,
  onFileChange,
  onUploadClick,
  onSubmit,
  onCancel,
  editMode,
}) => {
  return (
    <Card>
      <Title>{editMode ? "공지사항 수정" : "공지사항 작성"}</Title>

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

      {/* 수정 모드일 때 기존 파일 표시 */}
      {editMode && notice.fileName && (
        <ExistingFileBox>
          📎 기존 업로드 파일: <strong>{notice.fileName}</strong>
          <FileRemoveButton
            onClick={() =>
              setNotice({
                ...notice,
                fileName: null,
                fileUrl: null,
                file: null,
              })
            }
          >
            삭제
          </FileRemoveButton>
        </ExistingFileBox>
      )}

      {/* 새 파일 선택 */}
      <FileSection>
        <FileLabel>
          📎 새 파일 선택
          <input type="file" hidden onChange={onFileChange} />
        </FileLabel>

        {previewUrl && <PreviewImage src={previewUrl} alt="미리보기" />}

        {/* 이미지가 아닐 때 파일명 표시 */}
        {notice.file && !previewUrl && (
          <span>📄 첨부파일: {notice.file.name}</span>
        )}

        <UploadButton
          disabled={!notice.file}
          onClick={onUploadClick}
          style={{
            opacity: notice.file ? 1 : 0.4,
            cursor: notice.file ? "pointer" : "not-allowed",
          }}
        >
          파일 업로드
        </UploadButton>
      </FileSection>

      <ButtonGroup>
        <SubmitButton onClick={onSubmit}>
          {editMode ? "수정 완료" : "등록"}
        </SubmitButton>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </ButtonGroup>
    </Card>
  );
};

export default NoticeWrite;
