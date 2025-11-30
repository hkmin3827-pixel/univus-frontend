import styled from "styled-components";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f6ff;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
`;

const Card = styled.div`
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  border: 1px solid #cfd2ff;
  border-radius: 10px;
  margin-bottom: 20px;

  &:focus {
    outline: 2px solid #5f5fff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 260px;
  padding: 16px;
  font-size: 1.05rem;
  border: 1px solid #cfd2ff;
  border-radius: 10px;
  resize: none;
  margin-bottom: 24px;

  &:focus {
    outline: 2px solid #5f5fff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button`
  padding: 12px 26px;
  background: ${(p) => (p.cancel ? "#999" : "#5f5fff")};
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 1.07rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const NoticeWrite = ({ notice, setNotice, onSubmit, editMode, onCancel }) => {
  return (
    <Screen>
      <Wrapper>
        <Card>
          <Input
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
            <Button onClick={onSubmit}>
              {editMode ? "공지 수정" : "공지 등록"}
            </Button>
            <Button cancel onClick={onCancel}>
              취소
            </Button>
          </ButtonGroup>
        </Card>
      </Wrapper>
    </Screen>
  );
};

export default NoticeWrite;
