// src/pages/FindPasswordPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7ff;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 28px;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.15);
  }
`;

const Button = styled.button`
  margin-top: 6px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 999px;
  border: none;
  background: #6366f1;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const Message = styled.p`
  font-size: 0.85rem;
  margin: 0;
  color: ${(props) => (props.error ? "#ef4444" : "#16a34a")};
`;

const LinkText = styled.span`
  font-size: 0.85rem;
  color: #6366f1;
  cursor: pointer;
  text-align: right;
`;

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setErrMsg("이메일을 입력해 주세요.");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setErrMsg("");
      const res = await AxiosApi.requestPasswordReset(email);
      setMsg(res.data.message || "비밀번호 재설정 링크를 전송했습니다.");
    } catch (err) {
      console.error(err);
      setMsg("");
      if (err.response && err.response.data && err.response.data.message) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("이메일을 다시 확인해 주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>비밀번호 찾기</Title>
        <Description>
          가입하신 이메일을 입력해 주세요.
          <br />
          비밀번호 재설정 링크를 메일로 보내드릴게요.
        </Description>

        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@univus.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "전송 중..." : "재설정 링크 보내기"}
        </Button>

        {msg && <Message>{msg}</Message>}
        {errMsg && <Message error>{errMsg}</Message>}

        <LinkText onClick={() => navigate("/")}>
          로그인 화면으로 돌아가기
        </LinkText>
      </Card>
    </Container>
  );
};

export default FindPasswordPage;
