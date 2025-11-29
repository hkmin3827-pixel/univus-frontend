import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 200px;
  margin-bottom: 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => (props.disabled ? "#aaa" : "#5f5fff")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#aaa" : "#4f4fd1")};
  }
`;

const NoticeWrite = ({
  notice,
  setNotice,
  onSubmit,
  editMode = false,
  onCancel,
}) => {
  const isEnabled = notice.title.trim() && notice.content.trim();

  return (
    <Container>
      <Input
        type="text"
        placeholder="제목을 입력하세요"
        value={notice.title}
        onChange={(e) => setNotice({ ...notice, title: e.target.value })}
      />
      <TextArea
        placeholder="내용을 입력하세요"
        value={notice.content}
        onChange={(e) => setNotice({ ...notice, content: e.target.value })}
      />
      <ButtonGroup>
        <Button onClick={onSubmit} disabled={!isEnabled}>
          {editMode ? "수정" : "등록"}
        </Button>
        <Button
          onClick={onCancel || (() => setNotice({ title: "", content: "" }))}
        >
          취소
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NoticeWrite;
