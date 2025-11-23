// src/pages/Home.js
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Button } from "../components/home/HomeComponent";

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

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => navigate("/team/create")}>팀 생성</Button>
        <Button onClick={() => navigate("/team/entry")}>팀 가입</Button>
        <Button onClick={() => navigate("/team/invite")}>팀 초대</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Home;
