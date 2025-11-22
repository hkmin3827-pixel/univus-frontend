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

const LogIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
    setIsEmail(true);
  };

  const onChangePw = (e) => {
    setInputPw(e.target.value);
    setIsPw(true);
  };

  const onClickToSignUp = () => {
    navigate("/signup");
  };

  const onClickLogIn = async () => {
    try {
      const response = await AxiosApi.login(inputEmail, inputPw);
       // 로그인 실패 시 백엔드에서 예외를 던지는지, 401을 주는지에 따라 분기 추가 가능
    if (response.status === 200 && response.data) {
      const { email, name, role, image, regDate } = response.data;

      localStorage.setItem("isLogin", "TRUE");
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);   // "ADMIN" / "STUDENT" / "PROFESSOR" 등
      // 필요하면 name, image, regDate도 저장
        navigate("/home");
      } else {
        alert("이메일 또는 패스워드가 틀립니다.");
      }
    } catch (e) {
      alert("서버가 응답 하지 않습니다." + e);
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
