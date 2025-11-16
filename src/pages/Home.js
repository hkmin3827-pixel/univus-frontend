// 홈페이지
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { Container, Button } from "../components/home/HomeComponent";

const Home = () => {
  const navigate = useNavigate();

  const onClickTeamCreate = () => {
    navigate("/team/create");
  };
  const onClickTeamEntry = () => {
    navigate("/team/entry");
  };
  return (
    <Container>
      <Button onClick={onClickTeamCreate}>팀 생성</Button>
      <Button onClick={onClickTeamEntry}>팀 가입</Button>
    </Container>
  );
};

export default Home;
