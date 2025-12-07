// 회원 가입 페이지
import { useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Items,
  RoleBox,
  RoleOption,
  TabButton,
  TopMenu,
  FormWrapper,
  FormCard,
} from "../components/signUp/SignUpComponent";
import InputComponent from "../components/common/InputComponent";
import ButtonComponent from "../components/common/ButtonComponent";
import logo from "../images/layoutLogo.png";
import "../styles/login.css";

const SignUp = () => {
  const navigate = useNavigate();

  // const [profileImg, setProfileImg] = useState(null); // 실제 파일
  // const [previewUrl, setPreviewUrl] = useState(""); // 미리보기용 URL

  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputTelNum, setInputTelNum] = useState(); // 전화 번호
  const [role, setRole] = useState("STUDENT");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isTelNum, setIsTelNum] = useState(false);
  const [isRole, setIsRole] = useState(true);

  // 오류 메시지
  const [emailMsg, setEmailMsg] = useState(""); // 이메일 가입 여부 검사, 정규식 검사
  const [pwMsg, setPwMsg] = useState(""); // 패스워드 정규식 검사
  const [conPwMsg, setConPwMsg] = useState(""); // 비밀번호 일치
  const [telMsg, setTelMsg] = useState("");
  // 여부 검사

  // const onChangeImg = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImg(file);
  //     setPreviewUrl(URL.createObjectURL(file)); // 로컬 미리보기 URL 생성
  //   }
  // };

  const onChangeEmail = async (e) => {
    const email = e.target.value;
    setInputEmail(email);
    const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!regEx.test(email)) {
      setEmailMsg("올바르지 않은 이메일 형식입니다.");
      setIsEmail(false);
      return;
    }

    try {
      const exists = await AxiosApi.emailcheck(email); // ← Boolean
      console.log("이메일 중복 체크 응답:", exists);

      if (exists) {
        // 이미 DB에 있음 → 사용 불가능
        setEmailMsg("이미 사용 중인 이메일입니다.");
        setIsEmail(false);
      } else {
        // DB에 없음 → 사용 가능
        setEmailMsg("사용 가능한 이메일입니다.");
        setIsEmail(true);
      }
    } catch (e) {
      console.error("이메일 체크 에러:", e.response?.status, e.response?.data);
      setEmailMsg("회원 조회에 실패하였습니다.");
      setIsEmail(false);
    }
  };

  const onChangePw = (e) => {
    const pw = e.target.value;
    setInputPw(pw);
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_+=])(?=.{8,16}$)/;
    if (regEx.test(pw)) {
      setPwMsg("사용 가능한 비밀번호 입니다.");
      setIsPw(true);
    } else {
      setPwMsg(
        "하나 이상의 영어 대소문자, 숫자, 특수문자 조합으로 8자 이상 16자 이하로 입력 하세요."
      );
      setIsPw(false);
    }
  };

  const onChangeConPw = (e) => {
    const conPw = e.target.value;
    setInputConPw(conPw);
    if (inputPw === conPw) {
      setConPwMsg("비밀번호가 일치 합니다.");
      setIsConPw(true);
    } else {
      setConPwMsg("비밀번호가 일치하지 않습니다.");
      setIsConPw(false);
    }
  };

  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };

  const onChangeTelNum = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만
    const phoneRegex = /^010\d{8}$/;
    setInputTelNum(value);
    if (phoneRegex.test(value)) {
      setIsTelNum(true);
      setTelMsg("");
    } else {
      setIsTelNum(false);
      setTelMsg("전화번호 형식이 올바르지 않습니다. (예: 01012345678)");
    }
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
    setIsRole(true);
  };

  const onClickToLogin = () => {
    navigate("/");
  };

  const onClickSignUp = async () => {
    try {
      const res = await AxiosApi.signup(
        inputEmail,
        inputPw,
        inputName,
        inputTelNum,
        role
      );
      if (res.data) {
        navigate("/"); // 회원 가입 성공 시 로그인 페이지로 이동
      } else {
        alert("회원 가입에 실패 하였습니다. 다시 확인해주세요.");
      }
    } catch (e) {
      alert("서버가 응답하지 않습니다." + e);
    }
  };

  return (
    <Container>
      <img className="logo" src={logo} alt="univus 로고" />
      <TopMenu>
        <TabButton onClick={onClickToLogin} e>
          로그인
        </TabButton>
        <TabButton active>회원가입</TabButton>
      </TopMenu>
      <FormWrapper>
        <FormCard>
          <Items variant="title">
            <span>회원가입</span>
          </Items>
          <Items variant="item2">
            <InputComponent
              type="email"
              placeholder="이메일"
              value={inputEmail}
              onChange={onChangeEmail}
            />
          </Items>
          <Items variant="hint">
            <p>{emailMsg}</p>
          </Items>
          <Items variant="item2">
            <InputComponent
              type="password"
              placeholder="비밀번호"
              value={inputPw}
              onChange={onChangePw}
            />
          </Items>
          <Items variant="hint">
            <p>{pwMsg}</p>
          </Items>
          <Items variant="item2">
            <InputComponent
              type="password"
              placeholder="비밀번호 확인"
              value={inputConPw}
              onChange={onChangeConPw}
            />
          </Items>
          <Items variant="hint">
            <p>{conPwMsg}</p>
          </Items>
          <Items variant="item2">
            <InputComponent
              type="name"
              placeholder="이름"
              value={inputName}
              onChange={onChangeName}
            />
          </Items>

          <Items variant="item2">
            <RoleBox>
              <RoleOption>
                <input
                  type="radio"
                  name="role"
                  value="STUDENT"
                  checked={role === "STUDENT"}
                  onChange={onChangeRole}
                />
                학생
              </RoleOption>
              <RoleOption>
                <input
                  type="radio"
                  name="role"
                  value="PROFESSOR"
                  checked={role === "PROFESSOR"}
                  onChange={onChangeRole}
                />
                교수
              </RoleOption>
            </RoleBox>
          </Items>

          <Items variant="item2">
            <InputComponent
              type="tel"
              placeholder="전화번호"
              value={inputTelNum}
              onChange={onChangeTelNum}
            />
          </Items>
          <Items variant="hint">
            <p>{telMsg}</p>
          </Items>

          <Items variant="item2">
            {isEmail && isPw && isConPw && isName && isTelNum && isRole ? (
              <ButtonComponent enabled onClick={onClickSignUp}>
                회원 가입
              </ButtonComponent>
            ) : (
              <ButtonComponent disabled>회원 가입</ButtonComponent>
            )}
          </Items>
        </FormCard>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;
