// NoticeWrite.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
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
  height: 120px;
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

const NoticeWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  // Modal 상태
  const [modalContent, setModalContent] = useState("");
  const [modalHeader, setModalHeader] = useState("실패");
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  // 입력 핸들러
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  // 제출
  const handleSubmit = async () => {
    if (!title.trim()) {
      setModalHeader("실패");
      setModalContent("제목을 입력하세요.");
      setModalOpen(true);
      return;
    }

    try {
      const rsp = await AxiosApi.noticeCreate(title, content);

      if (rsp.data) {
        setModalHeader("성공");
        setModalContent("공지사항이 등록되었습니다.");
        setModalOpen(true);
      } else {
        setModalHeader("실패");
        setModalContent("공지 등록 실패.");
        setModalOpen(true);
      }
    } catch (err) {
      console.error(err);
      setModalHeader("실패");
      setModalContent("서버 오류로 등록할 수 없습니다.");
      setModalOpen(true);
    }
  };

  // Modal 확인 → 목록으로 이동
  const confirm = () => navigate("/notice");

  // 취소
  const handleReset = () => {
    setTitle("");
    setContent("");
    navigate("/notice");
  };

  return (
    <FormContainer>
      <Title>공지사항 작성</Title>

      <FieldContainer>
        <StyledLabel>제목</StyledLabel>
        <StyledInput type="text" value={title} onChange={handleTitleChange} />
      </FieldContainer>

      <FieldContainer>
        <StyledLabel>내용</StyledLabel>
        <StyledTextarea value={content} onChange={handleContentChange} />
      </FieldContainer>

      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
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

export default NoticeWrite;
