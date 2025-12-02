import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AxiosApi from "../api/AxiosApi";
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
import ButtonComponent from "../components/common/ButtonComponent";
import { TeamContext } from "../context/TeamContext";
import { UserContext } from "../context/UserContext";
import TeamApi from "../api/TeamApi";

function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams(); // null 가능
  const [userInfo, setUserInfo] = useState({});
  const { selectedTeam } = useContext(TeamContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          // 특정 멤버 정보 조회
          const res = await AxiosApi.getUserById(userId);

          setUserInfo(res.data);
        }
        console.log(
          "leaderId:",
          selectedTeam?.leaderId,
          typeof selectedTeam?.leaderId
        );
      } catch (err) {
        console.error("유저 정보 조회 실패:", err);
      }
    };

    fetchUserInfo();
  }, [userId]);
  useEffect(() => {
    console.log("💡 userInfo 최신:", userInfo);
    console.log("loginUser:", user?.id);
    console.log("targetUserId:", userInfo?.id);
  }, [userInfo]);
  if (!userInfo) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>로딩중...</div>
    );
  }

  const handleKickMember = async () => {
    if (!window.confirm(`${userInfo.name} 님을 팀에서 제외하시겠습니까?`))
      return;

    try {
      await TeamApi.kickMember(selectedTeam.id, userInfo.id);
      alert("팀원 강제 탈퇴 완료");
      navigate(`/team/${selectedTeam.id}/info`);
    } catch (err) {
      console.error("강제 탈퇴 실패:", err);
      alert("강제 탈퇴 중 오류가 발생했습니다.");
    }
  };
  return (
    <Container>
      <FormBox>
        <Title>회원 정보</Title>

        {/* 기본 정보 */}
        <SectionTitle>기본 정보</SectionTitle>
        <Row>
          <Label>프로필</Label>
          <Value>
            <ProfileImage
              src={
                userInfo.image?.trim()
                  ? userInfo.image
                  : "/images/default-profile.png"
              }
            />
          </Value>
        </Row>

        <Row>
          <Label>이메일</Label>
          <Value>{userInfo.email}</Value>
        </Row>

        <Row>
          <Label>이름</Label>
          <Value>{userInfo.name}</Value>
        </Row>

        <Row>
          <Label>전화번호</Label>
          <Value>{userInfo.phone || "-"}</Value>
        </Row>

        {/* 교수 */}
        {userInfo.role === "PROFESSOR" && (
          <>
            <SectionTitle>교수 정보</SectionTitle>
            <Row>
              <Label>소속 학과</Label>
              <Value>{userInfo.department || "-"}</Value>
            </Row>
            <Row>
              <Label>직책</Label>
              <Value>{userInfo.position || "-"}</Value>
            </Row>
          </>
        )}

        {/* 학생 */}
        {userInfo.role === "STUDENT" && (
          <>
            <SectionTitle>학생 정보</SectionTitle>
            <Row>
              <Label>학번</Label>
              <Value>{userInfo.studentNumber || "-"}</Value>
            </Row>
            <Row>
              <Label>전공</Label>
              <Value>{userInfo.major || "-"}</Value>
            </Row>
            <Row>
              <Label>학년</Label>
              <Value>{userInfo.grade || "-"}</Value>
            </Row>
          </>
        )}

        <ButtonRow>
          <ButtonComponent type="button" onClick={() => navigate(-1)}>
            뒤로가기
          </ButtonComponent>
        </ButtonRow>
        {selectedTeam?.leaderId === user.id &&
          userInfo.id &&
          userInfo.id !== selectedTeam?.leaderId && (
            <span
              style={{
                color: "rgb(185, 39, 39)",
                cursor: "pointer",
                fontSize: "14px",
                display: "block",
                margin: "10px auto",
              }}
              onClick={handleKickMember}
            >
              팀에서 강제 탈퇴시키기
            </span>
          )}
      </FormBox>
    </Container>
  );
}

export default UserProfile;
