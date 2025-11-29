// src/pages/Profile.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import InputComponent from "../components/common/InputComponent";
import ButtonComponent from "../components/common/ButtonComponent";
import {
  Title,
  FormBox,
  Row,
  Label,
  ErrorText,
  ButtonRow,
} from "../components/profile/ProfileComponent";
import styled from "styled-components";

// 🔹 회원 정보 "수정" 페이지 전용 래퍼 (배경/여백 담당)
const EditWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 60px 60px 80px; // 위/아래 여백 조금 더 줌
  background: #f5f7ff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profiledetail"); // 프로필 수정 페이지로 이동
  };

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

    try {
      // 1) 공통 User 정보 수정
      await AxiosApi.updateUserProfile(email, {
        name,
        phone: tel, // DTO에서 phone 필드 사용
      });

      // 2) 학생/교수 개별 정보 수정
      if (role === "STUDENT") {
        await AxiosApi.updateStudentProfile(email, {
          major,
          studentNumber,
          grade: grade ? Number(grade) : null,
        });
      } else if (role === "PROFESSOR") {
        await AxiosApi.updateProfessorProfile(email, {
          department,
          position,
        });
      }

      setSubmitSuccess("회원 정보가 수정되었습니다.");
      alert("회원 정보가 수정되었습니다."); // ✅ 메시지 띄우고
      navigate("/profiledetail");
    } catch (err) {
      console.error(err);
      setSubmitError("수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <EditWrapper>
      <FormBox onSubmit={onSubmit}>
        <Title>회원 정보 수정</Title>
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

        {submitError && <ErrorText>{submitError}</ErrorText>}
        {submitSuccess && (
          <p style={{ color: "#22aa22", fontSize: "12px" }}>{submitSuccess}</p>
        )}

        <ButtonRow>
          <ButtonComponent type="submit">저장</ButtonComponent>
          <ButtonComponent type="button" onClick={() => navigate(-1)}>
            취소
          </ButtonComponent>
        </ButtonRow>
      </FormBox>
    </EditWrapper>
  );
};

export default Profile;
