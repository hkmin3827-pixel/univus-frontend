// src/pages/ProfileDetail.jsx (파일 위치는 프로젝트 구조에 맞게)
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../context/TeamContext";
import TeamApi from "../api/TeamApi";
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
const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;
const TeamInfo = () => {
  const navigate = useNavigate();
  const { selectedTeam } = useContext(TeamContext);
  const [members, setMembers] = useState([]);

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
    console.log("selectedTeam.id:", selectedTeam?.id);
    if (!selectedTeam) return;
    fetchTeamMembers();
  }, [selectedTeam]);
  if (!selectedTeam) {
    return <div className="team-info-container">팀이 선택되지 않았습니다.</div>;
  }

  // 진입 시 로그인 정보 + 프로필 불러오기

  return (
    <Container>
      <FormBox>
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
              <div key={m.userId} className="member-card">
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
        <button>팀 탈퇴하기</button>
      </FormBox>
    </Container>
  );
};

export default TeamInfo;
