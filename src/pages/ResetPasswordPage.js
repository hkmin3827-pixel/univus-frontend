// src/pages/ResetPasswordPage.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 12px;
  border-radius: 999px;
  border: none;
  background: ${(props) => (props.secondary ? "#e5e7eb" : "#6366f1")};
  color: ${(props) => (props.secondary ? "#374151" : "#ffffff")};
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

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [validating, setValidating] = useState(true);
  const [valid, setValid] = useState(false);
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);

  // 페이지 들어오면 토큰 검증
  useEffect(() => {
    const validate = async () => {
      try {
        await AxiosApi.validatePasswordResetToken(token);
        setValid(true);
      } catch (err) {
        console.error(err);
        setErrMsg(
          err.response?.data?.message || "유효하지 않거나 만료된 링크입니다."
        );
      } finally {
        setValidating(false);
      }
    };
    validate();
  }, [token]);

  const handleSubmit = async () => {
    if (!password || !passwordCheck) {
      setErrMsg("새 비밀번호와 확인 비밀번호를 모두 입력해 주세요.");
      setMsg("");
      return;
    }
    if (password !== passwordCheck) {
      setErrMsg("비밀번호가 서로 일치하지 않습니다.");
      setMsg("");
      return;
    }
    if (password.length < 6) {
      setErrMsg("비밀번호는 6자 이상으로 설정해 주세요.");
      setMsg("");
      return;
    }

    try {
      setLoading(true);
      setErrMsg("");
      const res = await AxiosApi.confirmPasswordReset(token, password);
      setMsg(res.data.message || "비밀번호가 변경되었습니다.");
      // 잠깐 보여주고 로그인으로 이동
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMsg("");
      setErrMsg(
        err.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 토큰 검증 중
  if (validating) {
    return (
      <Container>
        <Card>
          <Title>링크 확인 중...</Title>
          <Description>잠시만 기다려 주세요.</Description>
        </Card>
      </Container>
    );
  }

  // 토큰이 유효하지 않음
  if (!valid) {
    return (
      <Container>
        <Card>
          <Title>유효하지 않은 링크</Title>
          <Description>
            {errMsg || "이미 사용되었거나 만료된 비밀번호 재설정 링크입니다."}
          </Description>
          <Button onClick={() => navigate("/auth/find-password")}>
            비밀번호 찾기 다시 시도
          </Button>
        </Card>
      </Container>
    );
  }

  // 정상 화면
  return (
    <Container>
      <Card>
        <Title>새 비밀번호 설정</Title>
        <Description>사용하실 새 비밀번호를 입력해 주세요.</Description>

        <div>
          <Label htmlFor="password">새 비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="passwordCheck">비밀번호 확인</Label>
          <Input
            id="passwordCheck"
            type="password"
            placeholder="비밀번호 다시 입력"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>

        <ButtonRow>
          <Button
            secondary
            type="button"
            onClick={() => navigate("/auth/login")}
          >
            로그인으로
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "변경 중..." : "비밀번호 변경"}
          </Button>
        </ButtonRow>

        {msg && <Message>{msg}</Message>}
        {errMsg && <Message error>{errMsg}</Message>}
      </Card>
    </Container>
  );
};

export default ResetPasswordPage;
