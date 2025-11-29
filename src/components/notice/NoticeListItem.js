import React from "react";
import styled from "styled-components";
import Commons from "../../utils/Commons";

const NoticeLi = styled.li`
  background-color: #f2f2f2;
  margin: 10px 0;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e9f4ff;
  }
`;

const NoticeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #d8e6ff;
  margin-right: 15px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: bold;
  color: #3a76ff;
`;

const NoticeContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-top: 5px;
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const NoticeTitle = styled.h2`
  font-size: 1.4em;
  color: #007bff;
  margin: 0 0 10px;
`;

const NoticeWriter = styled.span`
  color: #555;
  font-style: italic;
  font-size: 13px;
  white-space: nowrap;
`;

const NoticeContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoticeDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
  margin: 0;
`;

const NoticeListItem = ({ notice, handleDetailClick }) => {
  const onClick = () => {
    handleDetailClick(notice.id);
  };

  return (
    <NoticeLi onClick={onClick}>
      {/* 공지 아이콘 또는 첫 글자 기반 UI */}
      <NoticeIcon>📢</NoticeIcon>

      <NoticeContentWrapper>
        <NoticeHeader>
          <NoticeTitle>{notice.title}</NoticeTitle>
          <NoticeWriter>작성자: {notice.email}</NoticeWriter>
        </NoticeHeader>

        <NoticeContent>{notice.content}</NoticeContent>

        <NoticeDate>
          {notice.regDate ? Commons.timeFromNow(notice.regDate) : ""}
        </NoticeDate>
      </NoticeContentWrapper>
    </NoticeLi>
  );
};

export default NoticeListItem;
