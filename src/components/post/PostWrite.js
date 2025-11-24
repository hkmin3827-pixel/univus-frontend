// 게시글 쓰기
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import { storage } from "../../api/Firebase";
import Modal from "../common/Modal";

const FormContainer = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  flex: 0 0 100px;
  margin-right: 10px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const PostWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  // Modal 처리 상태
  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  // 제목 입력
  const handleTitleChange = (e) => setTitle(e.target.value);

  // 내용 입력
  const handleContentChange = (e) => setContent(e.target.value);

  // 파일 선택
  const handleFileInputChange = (e) => setFile(e.target.files[0]);

  // 파일 업로드
  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);

      const url = await fileRef.getDownloadURL();
      setUrl(url);

      console.log("Firebase 업로드 성공:", url);
    } catch (e) {
      console.log(e);
    }
  };

  // 글쓰기 제출
  const handleSubmit = async () => {
    try {
      const rsp = await AxiosApi.postWrite(name, title, content, url);

      if (rsp.data) {
        setModalHeader("성공");
        setModalContent("글쓰기가 완료되었습니다.");
        setModalOpen(true);
      } else {
        setModalHeader("실패");
        setModalContent("글쓰기 실패");
        setModalOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const confirm = () => navigate("/post"); // 페이지 navigate 주소 수정 필요!!!!!!!!!!!!!!1

  // 글쓰기 취소
  const handleReset = () => {
    setTitle("");
    setContent("");
    navigate("/post");
  };

  return (
    <FormContainer>
      <Title>글쓰기</Title>
      <FieldContainer>
        <StyledLabel>제목</StyledLabel>
        <StyledInput type="text" value={title} onChange={handleTitleChange} />
      </FieldContainer>
      <FieldContainer>
        <StyledLabel>내용</StyledLabel>
        <StyledTextarea value={content} onChange={handleContentChange} />
      </FieldContainer>
      <FileUploadContainer>
        <StyledInput type="file" onChange={handleFileInputChange} />
        <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      </FileUploadContainer>
      {url && <UserImage src={url} alt="uploaded image" />}
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
        <SubmitButton onClick={handleReset}>취소</SubmitButton>
      </ButtonContainer>

      <Modal
        open={modalOpen}
        close={closeModal}
        header={modalHeader}
        type
        confirm={confirm}
      >
        {modalContent}
      </Modal>
    </FormContainer>
  );
};

export default PostWrite;
