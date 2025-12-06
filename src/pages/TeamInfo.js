// src/pages/ProfileDetail.jsx (파일 위치는 프로젝트 구조에 맞게)
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import { TeamContext } from "../context/TeamContext";
import {
  Container,
  FormBox,
  Title,
  SectionTitle,
  Row,
  Label,
  Value,
} from "../components/profile/ProfileComponent";
import "../styles/TeamInfo.css";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;
const EditButton = styled.button`
  position: absolute;
  top: 18px;
  right: 22px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #5f52ff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);

  &:hover {
    background: #4338ca;
    transform: translateY(-2px);
  }

  .material-symbols-outlined {
    font-size: 20px;
    color: white;
  }
`;
const TeamInfo = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const { selectedTeam } = useContext(TeamContext);
  const [members, setMembers] = useState([]);
  const { user } = useContext(UserContext);

  const fetchTeamMembers = async () => {
    try {
      const res = await TeamApi.getTeamMembers(selectedTeam.id);
      setMembers(res.data);
    } catch (err) {
      console.error("팀 멤버 조회 실패:", err);
    }
  };
  useEffect(() => {
    console.log("selectedTeam:", selectedTeam);
    console.log("user:", user); // 여기에 값 있어야 버튼 보임
    console.log("user.id:", user?.id);
    console.log("leaderId:", selectedTeam?.leaderId);
    if (!selectedTeam) return;
    fetchTeamMembers();
  }, [selectedTeam, user]);
  if (!selectedTeam) {
    return <div className="team-info-container">팀이 선택되지 않았습니다.</div>;
  }

  const handleLeaveTeam = async () => {
    if (!window.confirm("정말 팀에서 탈퇴하시겠습니까?")) return;
    try {
      if (selectedTeam.leaderId === user.id) {
        alert("팀장은 팀삭제 외에 탈퇴 불가능합니다.");
        return;
      }

      await TeamApi.leaveTeam(selectedTeam.id);
      navigate("/home");
    } catch (err) {
      console.error("팀 탈퇴 실패:", err);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
  };

  // 진입 시 로그인 정보 + 프로필 불러오기

  return (
    <Container>
      <FormBox style={{ position: "relative" }}>
        {selectedTeam.leaderId === user.id && (
          <EditButton
            type="button"
            onClick={() => navigate(`/team/${teamId}/edit`)}
          >
            <span className="material-symbols-outlined">edit</span>
          </EditButton>
        )}
        <Title>{selectedTeam.teamName} 상세 정보</Title>

        {/* 팀 기본 정보 */}
        <Row>
          <Label>팀 이름</Label>
          <Value>{selectedTeam.teamName}</Value>
        </Row>
        <Row>
          <Label>팀 설명</Label>
          <Value>{selectedTeam.description || "-"}</Value>
        </Row>
        <Row>
          <Label>팀장</Label>
          <Value>
            {selectedTeam.leaderName}&lt;{selectedTeam.leaderEmail}&gt;
          </Value>
        </Row>

        {/* 멤버 목록 */}
        <SectionTitle style={{ marginTop: "30px" }}>팀 멤버 목록</SectionTitle>

        <div className="members-container">
          {members.length === 0 ? (
            <p className="empty">아직 팀원이 없습니다.</p>
          ) : (
            members.map((m) => (
              <div
                key={m.userId}
                className="member-card"
                onClick={() => {
                  navigate(`/team/${teamId}/userprofile/${m.userId}`);
                }}
              >
                {m.userImage && m.userImage.trim() !== "" ? (
                  <ProfileImg
                    className="profile-img"
                    src={m.userImage}
                    alt="프로필"
                  />
                ) : (
                  <span className="material-symbols-outlined circle">
                    account_circle
                  </span>
                )}

                <div className="member-info">
                  <p className="member-name">{m.userName}</p>
                  <p className="member-email">{m.userEmail}</p>
                </div>

                {m.userRole === "PROFESSOR" && (
                  <span className="crown">교수 👑</span>
                )}
              </div>
            ))
          )}
        </div>
        <span className="team-out" onClick={handleLeaveTeam}>
          팀 탈퇴하기
        </span>
      </FormBox>
    </Container>
  );
};

export default TeamInfo;
