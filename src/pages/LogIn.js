// 로그인 페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import InputComponent from "../components/common/InputComponent";
import Button from "../components/common/ButtonComponent";
import logo from "../images/layoutLogo.png";
import "../styles/login.css";

import {
  Container,
  TopMenu,
  TabButton,
  FormWrapper,
  FormCard,
  Items,
} from "../components/signUp/SignUpComponent"; // ⭐ 회원가입 스타일 재사용

import styled from "styled-components";

// 비밀번호 찾기 버튼
const FindPwButton = styled.button`
  border: none;
  background: transparent;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
`;

// 에러 메시지 (비밀번호 입력 아래, 오른쪽 정렬)
const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #ef4444;
`;

const LogIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const [error, setError] = useState(""); // 로그인 에러 메시지

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
    setIsEmail(true);
    setError(""); // 입력 바뀌면 에러 초기화
  };

  const onChangePw = (e) => {
    setInputPw(e.target.value);
    setIsPw(true);
    setError(""); // 입력 바뀌면 에러 초기화
  };

  const onClickToSignUp = () => {
    navigate("/signup");
  };

  const onClickLogIn = async () => {
    setError("");

    try {
      const response = await AxiosApi.login(inputEmail, inputPw);

      if (response.status === 200 && response.data) {
        const { id, email, name, role, image, regDate } = response.data;

        localStorage.setItem("isLogin", "TRUE");
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", id);
        // 필요하면 name, image, regDate도 저장 가능

        navigate("/home");
      } else {
        setError("이메일 또는 비밀번호를 확인해 주세요.");
      }
    } catch (e) {
      if (!e.response) {
        setError("서버가 응답하지 않습니다.");
        return;
      }

      const errorMessage = e.response.data?.message;
      setError(errorMessage || "이메일 또는 비밀번호를 확인해 주세요.");
    }
  };

  const isFormValid = isEmail && isPw;

  return (
    <Container>
      {/* 로고 */}
      <img className="logo" src={logo} alt="univus 로고" />

      {/* 상단 우측 탭 버튼 */}
      <TopMenu>
        <TabButton active>로그인</TabButton>
        <TabButton onClick={onClickToSignUp}>회원가입</TabButton>
      </TopMenu>

      {/* 가운데 카드 레이아웃 */}
      <FormWrapper>
        <FormCard>
          {/* 타이틀 */}
          <Items variant="title">
            <span>로그인</span>
          </Items>

          {/* 아이디 / 이메일 */}
          <Items variant="item2">
            <InputComponent
              type="email"
              placeholder="아이디"
              value={inputEmail}
              onChange={onChangeEmail}
            />
          </Items>

          {/* 비밀번호 */}
          <Items variant="item2">
            <InputComponent
              type="password"
              placeholder="비밀번호"
              value={inputPw}
              onChange={onChangePw}
            />
          </Items>

          {/* 에러 메시지 */}
          {error && (
            <Items variant="hint">
              <ErrorText>{error}</ErrorText>
            </Items>
          )}

          {/* 비밀번호 찾기 */}
          <Items
            variant="item2"
            style={{ alignItems: "flex-end", marginTop: error ? "0" : "4px" }}
          >
            <FindPwButton type="button">비밀번호 찾기</FindPwButton>
          </Items>

          {/* 로그인 버튼 */}
          <Items variant="item2">
            {isFormValid ? (
              <Button enabled onClick={onClickLogIn}>
                로그인
              </Button>
            ) : (
              <Button disabled>로그인</Button>
            )}
          </Items>
        </FormCard>
      </FormWrapper>
    </Container>
  );
};

export default LogIn;
