// src/pages/Profile.js
import { useEffect, useState, useRef } from "react";
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
  ProfileImage,
} from "../components/profile/ProfileComponent";
import styled from "styled-components";
import { uploadProfileImage } from "../api/Firebase";
import profileDefaultImg from "../images/profileDefaultImg.png";

const EditWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f7ff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 40px 80px;
  box-sizing: border-box;
`;

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // 공통
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // 화면 미리보기용
  const [newImageFile, setNewImageFile] = useState(null); // 새로 선택한 파일

  // 학생
  const [studentNumber, setStudentNumber] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");

  // 교수
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // 프로필 불러오기
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");

    if (!storedEmail || !storedRole) {
      setSubmitError("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }

    setEmail(storedEmail);
    setRole(storedRole);

    const fetchProfile = async () => {
      try {
        let res =
          storedRole === "STUDENT"
            ? await AxiosApi.getStudentProfile(storedEmail)
            : await AxiosApi.getProfessorProfile(storedEmail);

        const data = res.data;
        setName(data.user?.name || "");
        setTel(data.user?.phone || "");
        setImageUrl(data.user?.image || "");

        if (storedRole === "STUDENT") {
          setStudentNumber(data.studentNumber || "");
          setMajor(data.major || "");
          setGrade(data.grade || "");
        } else {
          setDepartment(data.department || "");
          setPosition(data.position || "");
        }
      } catch (e) {
        setSubmitError("회원 정보를 불러오지 못했습니다.");
      }
    };

    fetchProfile();
  }, []);

  /** 🔹 이미지 선택 시 미리보기 */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImageFile(file);
    const preview = URL.createObjectURL(file);
    setImageUrl(preview);
  };

  /** 🔹 이미지 변경 버튼 클릭 → 숨겨진 input 실행 */
  const openFilePicker = () => fileInputRef.current?.click();

  /** 🔥 최종 저장 버튼 */
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(tel)) {
      alert("전화번호 형식이 올바르지 않습니다. (예: 01012345678)");
      return;
    }
    try {
      let finalImageUrl = imageUrl;

      // 🔥 1) 이미지가 새로 선택되었으면 Firebase로 업로드
      if (newImageFile) {
        finalImageUrl = await uploadProfileImage(newImageFile, email);
      }

      // 🔥 2) user 정보 업데이트 (URL만 백엔드로 전달)
      await AxiosApi.updateUserProfile(email, {
        name,
        phone: tel,
        image: finalImageUrl,
      });

      // 🔥 3) 학생/교수 개별 정보 업데이트
      if (role === "STUDENT") {
        await AxiosApi.updateStudentProfile(email, {
          major,
          grade: Number(grade),
          studentNumber,
        });
      } else {
        await AxiosApi.updateProfessorProfile(email, {
          department,
          position,
        });
      }

      alert("회원 정보가 수정되었습니다.");
      navigate("/profiledetail");
    } catch (err) {
      setSubmitError("수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <EditWrapper>
      <FormBox onSubmit={onSubmit}>
        <Title>회원 정보 수정</Title>

        {/* 🔹 프로필 이미지 + 변경 버튼 */}
        <Row>
          <Label>프로필</Label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ProfileImage
              src={
                imageUrl && imageUrl.trim() !== ""
                  ? imageUrl
                  : profileDefaultImg
              }
            />
            <ButtonComponent type="button" onClick={openFilePicker}>
              이미지 변경
            </ButtonComponent>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </Row>

        {/* 이메일 */}
        <Row>
          <Label>이메일</Label>
          <p style={{ padding: "5px 10px" }}>{email}</p>
          {/* <InputComponent type="email" value={email} readOnly /> */}
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

        {/* 추가 정보: 학생 */}
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

        {/* 추가 정보: 교수 */}
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
