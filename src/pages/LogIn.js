import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import InputComponent from "../components/common/InputComponent";
import Button from "../components/common/ButtonComponent";
import {
  Container,
  Items,
  TopMenu,
  TabButton,
  LoginBox,
} from "../components/login/LogInComponent";
import styled from "styled-components"; // 🔥 추가

// 🔥 비밀번호 입력창 아래에 뜨는 에러 메시지 스타일
const ErrorMessage = styled.div`
  margin: 6px 30px 10px; /* 비밀번호 찾기 버튼과 간격 확보 */
  font-size: 12px;
  color: #ff4d4f;
  text-align: right; /* 🔥 에러 메시지를 오른쪽으로 정렬 */
`;

const LogIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  // 🔥 에러 메시지 상태 추가
  const [error, setError] = useState("");

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
    setIsEmail(true);
    setError(""); // 입력 바뀌면 에러 초기화 (선택)
  };

  const onChangePw = (e) => {
    setInputPw(e.target.value);
    setIsPw(true);
    setError(""); // 입력 바뀌면 에러 초기화 (선택)
  };

  const onClickToSignUp = () => {
    navigate("/signup");
  };

  const onClickLogIn = async () => {
    // 이전 에러 지우기
    setError("");

    try {
      const response = await AxiosApi.login(inputEmail, inputPw);
      // 로그인 실패 시 백엔드에서 예외를 던지는지, 401을 주는지에 따라 분기 추가 가능
      if (response.status === 200 && response.data) {
        const { email, name, role, image, regDate } = response.data;

        localStorage.setItem("isLogin", "TRUE");
<<<<<<< HEAD
        // navigate("/home");
        navigate("/post");
=======
        localStorage.setItem("email", email);
        localStorage.setItem("role", role); // "ADMIN" / "STUDENT" / "PROFESSOR" 등
        // 필요하면 name, image, regDate도 저장
        navigate("/home");
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
      } else {
        alert("이메일 또는 패스워드가 틀립니다.");
      }
    } catch (e) {
      // 서버 연결 실패 (응답 자체가 없음)
      if (!e.response) {
        setError("서버가 응답하지 않습니다.");
        return;
      }

      // 백엔드에서 내려 준 메시지 (존재하지 않는 이메일 / 비밀번호 불일치 등)
      const errorMessage = e.response.data?.message;

      // 백엔드가 message 안 줄 경우 대비 기본 문구
      setError(errorMessage || "이메일 또는 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <Container>
      <TopMenu>
        <TabButton active>로그인</TabButton>
        <TabButton onClick={onClickToSignUp}>회원가입</TabButton>
      </TopMenu>

      <LoginBox>
        <div>
          <Items variant="title">
            <span>로그인</span>
          </Items>

          <Items>
            <InputComponent
              type="email"
              placeholder="아이디"
              value={inputEmail}
              onChange={onChangeEmail}
            />
          </Items>

          <Items>
            <InputComponent
              type="password"
              placeholder="비밀번호"
              value={inputPw}
              onChange={onChangePw}
            />
          </Items>

          {/* 🔥 비밀번호 입력창 바로 아래 에러 메시지 */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Items variant="hint">
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                fontSize: "12px",
                color: "#777",
                cursor: "pointer",
              }}
            >
              비밀번호 찾기
            </button>
          </Items>

          <Items justify="center" margin="20px 0 0 0">
            {isEmail && isPw ? (
              <Button enabled onClick={onClickLogIn} style={{ width: "100%" }}>
                로그인
              </Button>
            ) : (
              <Button disabled style={{ width: "100%" }}>
                로그인
              </Button>
            )}
          </Items>
        </div>
      </LoginBox>
    </Container>
  );
};

export default LogIn;
