// 로그인 페이지
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import InputComponent from "../components/common/InputComponent";
import Button from "../components/common/ButtonComponent";
import logo from "../images/layoutLogo.png";
import { TeamContext } from "../context/TeamContext";
import { UserContext } from "../context/UserContext";
import profileDefaultImg from "../images/profileDefaultImg.png";

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
  margin-bottom: 20px;

  &:hover {
    color: #333; /* 더 진한 회색 */
    text-decoration: underline;
    background: transparent;
  }
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
  const { fetchTeams, setSelectedTeam } = useContext(TeamContext);
  const { setUser } = useContext(UserContext);

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
        const { id, email, name, role, image, regDate, active } = response.data;

        if (!active) {
          setError("비활성화된 계정입니다. 관리자에게 문의해 주세요.");
          return; // ★ 아래 로그인 처리 로직 실행하지 않음
        }

        localStorage.setItem("isLogin", "TRUE");
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", id);
        localStorage.setItem("profileImage", image || profileDefaultImg);
        // 필요하면 name, image, regDate도 저장 가능
        setUser({
          id,
          email,
          name,
          role,
          image,
        });
        const teams = await fetchTeams();
        if (teams && teams.length > 0) {
          setSelectedTeam(teams[0]);
          navigate(`/team/${teams[0].id}`);
        } else {
          // ★ 팀이 없으면 홈으로
          navigate("/home");
        }
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
      <TopMenu>
        <img className="logo" src={logo} alt="univus 로고" />
        <div className="auth-buttons">
          <TabButton active>로그인</TabButton>
          <TabButton onClick={onClickToSignUp}>회원가입</TabButton>
        </div>
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
            style={{
              alignItems: "flex-end",
              marginTop: error ? "0" : "6px",
            }}
          >
            <FindPwButton
              type="button"
              onClick={() => {
                console.log("비밀번호 찾기 클릭!");
                navigate("/auth/find-password");
              }}
            >
              비밀번호 찾기
            </FindPwButton>
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
