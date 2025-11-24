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
  ErrorText,
  ButtonRow,
} from "../components/profile/ProfileComponent";

const ProfileDetail = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile"); // 페이지 이동
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

  // const [password, setPassword] = useState("");
  // const [confirmPw, setConfirmPw] = useState("");

  // const [pwError, setPwError] = useState("");
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
  };

  return (
    <Container>
      <Title>회원 정보</Title>
      <ButtonComponent type="button" onClick={goToProfile}>
        프로필 수정
      </ButtonComponent>
    </Container>
  );
};

export default ProfileDetail;
