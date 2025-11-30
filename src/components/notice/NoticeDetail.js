import React from "react";
import styled from "styled-components";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f6ff;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin-bottom: 16px;
  color: #222;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Meta = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 32px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: #444;
  font-size: 1.05rem;
`;

const NoticeDetail = ({ notice }) => {
  return (
    <Screen>
      <Container>
        <Title>{notice.title}</Title>
        <Meta>
          작성자: {notice.email || "알 수 없음"} | 작성일:{" "}
          {new Date(notice.createTime).toLocaleDateString()}
        </Meta>
        <Content>{notice.content}</Content>
      </Container>
    </Screen>
  );
};

export default NoticeDetail;
