// 공지 상세 부분
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 12px;
  color: #333;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 24px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
  color: #444;
`;

const NoticeDetail = ({ notice }) => {
  return (
    <Container>
      <Title>{notice.title}</Title>
      <Meta>
        작성자: {notice.email || "알 수 없음"} | 작성일:{" "}
        {new Date(notice.createTime).toLocaleDateString()}
      </Meta>
      <Content>{notice.content}</Content>
    </Container>
  );
};

export default NoticeDetail;
