import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// link: 누르면 이동, navigate: 특정 행동을 하면 이동
import AxiosApi from "../api/AxiosApi";
// import imgLogo from "../images/kakaoLion.png";
import styled from "styled-components";
import Button from "../components/common/ButtonComponent";
import InputComponent from "../components/common/InputComponent";
import { Container, Items } from "../components/login/LogInComponent";

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
      // 예외가 발생할 수 있는 상황에서 걸어 줌
      // 서버와 비동기 통신
      const response = await AxiosApi.login(inputEmail, inputPw);
      console.log(response.data);
      if (response.data) {
        // 로그인 성공 (서버로 부터 true를 수신)
        localStorage.setItem("email", "inputEmail"); // 로그인 성공 시 키값=email에 inputEmail 이메일을 저장
        localStorage.setItem("isLogin", "TRUE"); // 로그인 성공 상태
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
      <header>
        <Button onClick={onClickToSignUp}>회원가입</Button>
      </header>
      <Items variants="title">
        <span>로그인</span>
      </Items>
      <Items margin="10px">
        <InputComponent
          type="email"
          placeholder="이메일"
          value={inputEmail}
          onChange={onChangeEmail}
        />
      </Items>
      <Items margin="10px">
        <InputComponent
          type="password"
          placeholder="패스워드"
          value={inputPw}
          onChange={onChangePw}
        />
      </Items>
      <Items varient="item2">
        {isEmail && isPw ? (
          <Button enabeld onClick={onClickLogIn}>
            로그인
          </Button>
        ) : (
          <Button disabled>로그인</Button>
        )}
      </Items>
    </Container>
  );
};

export default LogIn;
