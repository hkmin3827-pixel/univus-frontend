// src/pages/TeamEdit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import styled from "styled-components";

// ⬇ 프로필에서 쓰는 공통 스타일
import {
  Container,
  FormBox,
  Title,
  Label,
  Row,
  ButtonRow,
} from "../components/profile/ProfileComponent";

// ⬇ 프로젝트 공통 버튼 컴포넌트
import ButtonComponent from "../components/common/ButtonComponent";

// 인풋 스타일만 따로
const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }
`;

// 🔥 취소 버튼 (ButtonComponent 기반)
const CancelButton = styled(ButtonComponent)`
  background: #e5e7eb !important;
  color: #374151 !important;
  box-shadow: none !important;

  &:hover {
    background: #d1d5db !important;
    transform: none;
  }
`;

const TeamEdit = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  // 기존 팀 정보 불러오기
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await TeamApi.getTeam(teamId);
        setTeamName(res.data.teamName);
        setDescription(res.data.description || "");
      } catch (err) {
        console.error(err);
        alert("팀 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchTeam();
  }, [teamId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TeamApi.updateTeam(teamId, teamName, description);
      alert("팀 정보가 수정되었습니다.");
      navigate(`/teams/${teamId}`);
    } catch (err) {
      console.error(err);
      alert("팀 정보 수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate(`/teams/${teamId}`);
  };

  return (
    <Container>
      <FormBox onSubmit={handleSubmit}>
        <Title>팀 정보 수정</Title>

        <Row>
          <Label>팀 이름</Label>
          <Input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="팀 이름을 입력하세요"
          />
        </Row>

        <Row>
          <Label>팀 설명</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="팀 설명을 입력하세요"
          />
        </Row>

        <ButtonRow style={{ width: "100%", gap: "12px" }}>
          {/* 저장 버튼 */}
          <ButtonComponent type="submit" enabled={true} style={{ flex: 1 }}>
            저장
          </ButtonComponent>

          {/* 취소 버튼 */}
          <CancelButton
            type="button"
            onClick={handleCancel}
            style={{ flex: 1 }}
          >
            취소
          </CancelButton>
        </ButtonRow>
      </FormBox>
    </Container>
  );
};

export default TeamEdit;
