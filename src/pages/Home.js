// src/pages/Home.js
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Button } from "../components/home/HomeComponent";
import { useState } from "react";
import TeamCreateModal from "../components/team/TeamCreateModal";
const ButtonGroup = styled.div`
  display: flex;
  gap: 16px; /* 버튼 사이 간격 */
  justify-content: center;
  margin-top: 40px;

  @media (max-width: 600px) {
    flex-direction: column; /* 모바일에서는 세로로 쌓임 */
    align-items: center;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <Container>
      <ButtonGroup>
        {/* <Button onClick={() => navigate("/team/create")}>팀 생성</Button> */}
        <Button onClick={() => setOpenCreateModal(true)}>팀 생성</Button>
        <Button onClick={() => navigate("/team/entry")}>팀 가입</Button>
        <Button onClick={() => navigate("/team/invite")}>팀 초대</Button>
      </ButtonGroup>

      {/* 모달들 */}
      <TeamCreateModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </Container>
  );
};

export default Home;
