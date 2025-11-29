// src/pages/ProfileDetail.jsx (파일 위치는 프로젝트 구조에 맞게)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import ButtonComponent from "../components/common/ButtonComponent";
import {
  Container,
  Title,
  FormBox,
  Row,
  Label,
  Value,
  ErrorText,
  ButtonRow,
  SectionTitle,
  ProfileImage,
} from "../components/profile/ProfileComponent";

const ProfileDetail = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile"); // 프로필 수정 페이지로 이동
  };

  const [role, setRole] = useState(""); // STUDENT / PROFESSOR
  const [email, setEmail] = useState("");

  // 공통
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 학생 전용
  const [studentNumber, setStudentNumber] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");

  // 교수 전용
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // 진입 시 로그인 정보 + 프로필 불러오기
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role"); // STUDENT / PROFESSOR

    if (!storedEmail || !storedRole) {
      setSubmitError("로그인 정보가 없습니다. 다시 로그인 해주세요.");
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
        setTel(data.user?.phone || "");
        setImageUrl(data.user?.image || "");

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
  }, []);

  return (
    <Container>
      <FormBox>
        <Title>회원 정보</Title>

        {submitError && <ErrorText>{submitError}</ErrorText>}

        {!submitError && (
          <>
            {/* 공통 정보 */}
            <SectionTitle>기본 정보</SectionTitle>
            <Row>
              <Label>프로필</Label>
              <Value>
                <ProfileImage
                  src={
                    imageUrl && imageUrl.trim() !== ""
                      ? imageUrl
                      : "/images/default-profile.png" // 기본 이미지 경로 (원하는 걸로 교체)
                  }
                  alt="프로필 이미지"
                />
              </Value>
            </Row>
            <Row>
              <Label>이메일</Label>
              <Value>{email}</Value>
            </Row>
            <Row>
              <Label>이름</Label>
              <Value>{name || "-"}</Value>
            </Row>
            <Row>
              <Label>전화번호</Label>
              <Value>{tel || "-"}</Value>
            </Row>

            {/* 학생 정보 */}
            {role === "STUDENT" && (
              <>
                <SectionTitle>학생 정보</SectionTitle>
                <Row>
                  <Label>학번</Label>
                  <Value>{studentNumber || "-"}</Value>
                </Row>
                <Row>
                  <Label>전공</Label>
                  <Value>{major || "-"}</Value>
                </Row>
                <Row>
                  <Label>학년</Label>
                  <Value>{grade || "-"}</Value>
                </Row>
              </>
            )}

            {/* 교수 정보 */}
            {role === "PROFESSOR" && (
              <>
                <SectionTitle>교수 정보</SectionTitle>
                <Row>
                  <Label>소속 학과</Label>
                  <Value>{department || "-"}</Value>
                </Row>
                <Row>
                  <Label>직책</Label>
                  <Value>{position || "-"}</Value>
                </Row>
              </>
            )}

            {submitSuccess && (
              <ErrorText style={{ color: "#16a34a" }}>
                {submitSuccess}
              </ErrorText>
            )}
          </>
        )}

        {/* 버튼 영역 */}
        <ButtonRow>
          <ButtonComponent type="button" onClick={goToProfile}>
            프로필 수정
          </ButtonComponent>
        </ButtonRow>
      </FormBox>
    </Container>
  );
};

export default ProfileDetail;
