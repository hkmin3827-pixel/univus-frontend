// src/pages/Profile.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import InputComponent from "../components/common/InputComponent";
import ButtonComponent from "../components/common/ButtonComponent";
import {
  Container,
  Title,
  FormBox,
  Row,
  Label,
  ErrorText,
  ButtonRow,
} from "../components/profile/ProfileComponent";

const Profile = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(""); // STUDENT / PROFESSOR
  const [email, setEmail] = useState("");

  // 공통
  const [name, setName] = useState("");
  const [tel, setTel] = useState(""); // JSON에는 안 보이지만, 있으면 쓰고 없으면 빈 값

  // 학생 전용
  const [studentNumber, setStudentNumber] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");

  // 교수 전용
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [pwError, setPwError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // 진입 시 로그인 정보 + 프로필 불러오기
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role"); // STUDENT / PROFESSOR

    if (!storedEmail || !storedRole) {
      setSubmitError("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      // navigate("/login");
      return;
    }

    setEmail(storedEmail);
    setRole(storedRole);

    const fetchProfile = async () => {
      try {
        let res;
        if (storedRole === "STUDENT") {
          res = await AxiosApi.getStudentProfile(storedEmail);
        } else if (storedRole === "PROFESSOR") {
          res = await AxiosApi.getProfessorProfile(storedEmail);
        } else {
          setSubmitError("알 수 없는 회원 유형입니다.");
          return;
        }

        const data = res.data;

        // 공통 user 정보 매핑
        setName(data.user?.name || "");
        setTel(data.user?.tel || ""); // user.tel 이 있으면 사용, 없으면 빈 값

        if (storedRole === "STUDENT") {
          setStudentNumber(data.studentNumber || "");
          setMajor(data.major || "");
          setGrade(data.grade || "");
        } else if (storedRole === "PROFESSOR") {
          setDepartment(data.department || "");
          setPosition(data.position || "");
        }
      } catch (e) {
        console.error(e);
        setSubmitError("회원 정보를 불러오지 못했습니다.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setPwError("");

    // // 비밀번호 검증(원하면 나중에 따로 페이지로 빼도 됨)
    // if (password || confirmPw) {
    //   if (password !== confirmPw) {
    //     setPwError("비밀번호가 일치하지 않습니다.");
    //     return;
    //   }
    //   if (password.length < 6) {
    //     setPwError("비밀번호는 6자 이상이어야 합니다.");
    //     return;
    //   }
    // }

    // 백엔드에 보낼 payload (JSON)
    const commonPayload = {
      name,
      tel, // 백엔드 DTO에 없으면 무시되거나 에러날 수 있음 → 필요에 따라 빼도 됨
      pwd: password || null, // 비밀번호 변경 안 하면 null 이거나 필드 아예 제거해도 됨
    };

    try {
      if (role === "STUDENT") {
        await AxiosApi.updateStudentProfile(email, {
          ...commonPayload,
          studentNumber,
          major,
          grade,
        });
      } else if (role === "PROFESSOR") {
        await AxiosApi.updateProfessorProfile(email, {
          ...commonPayload,
          department,
          position,
        });
      } else {
        setSubmitError("알 수 없는 회원 유형입니다.");
        return;
      }

      setSubmitSuccess("회원 정보가 수정되었습니다.");
    } catch (e) {
      console.error(e);
      setSubmitError("수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>회원 정보 수정</Title>
      <FormBox onSubmit={onSubmit}>
        {/* 이메일 (읽기 전용) */}
        <Row>
          <Label>이메일</Label>
          <InputComponent type="email" value={email} onChange={() => {}} />
        </Row>

        {/* 이름 */}
        <Row>
          <Label>이름</Label>
          <InputComponent
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Row>

        {/* 전화번호 */}
        <Row>
          <Label>전화번호</Label>
          <InputComponent
            type="text"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </Row>

        {/* 학생 / 교수에 따라 추가 정보 보여주기 */}
        {role === "STUDENT" && (
          <>
            <Row>
              <Label>학번</Label>
              <InputComponent
                type="text"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </Row>
            <Row>
              <Label>전공</Label>
              <InputComponent
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </Row>
            <Row>
              <Label>학년</Label>
              <InputComponent
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </Row>
          </>
        )}

        {role === "PROFESSOR" && (
          <>
            <Row>
              <Label>학과</Label>
              <InputComponent
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Row>
            <Row>
              <Label>직위</Label>
              <InputComponent
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Row>
          </>
        )}

        {/* 비밀번호
        <Row>
          <Label>새 비밀번호</Label>
          <InputComponent
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Row>

        <Row>
          <Label>비밀번호 확인</Label>
          <InputComponent
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          {pwError && <ErrorText>{pwError}</ErrorText>}
        </Row> */}

        {submitError && <ErrorText>{submitError}</ErrorText>}
        {submitSuccess && (
          <p style={{ color: "#22aa22", fontSize: "12px" }}>{submitSuccess}</p>
        )}

        <ButtonRow>
          <ButtonComponent text="저장" type="submit" />
          <ButtonComponent
            text="취소"
            type="button"
            onClick={() => navigate(-1)}
          />
        </ButtonRow>
      </FormBox>
    </Container>
  );
};

export default Profile;
