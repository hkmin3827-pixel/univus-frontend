import React from "react";
import styled from "styled-components";
import NoticeListItem from "./NoticeListItem";

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 각 공지 간 간격 */
`;

const EmptyMessage = styled.p`
  padding: 16px;
  color: #777;
  text-align: center;
  font-size: 1rem;
`;

const NoticeList = ({ noticeList = [], handleDetailClick }) => {
  if (!noticeList || noticeList.length === 0) {
    return <EmptyMessage>등록된 공지사항이 없습니다.</EmptyMessage>;
  }

  return (
    <NoticeContainer>
      {noticeList.map((notice) => (
        <NoticeListItem
          key={notice.id}
          notice={notice}
          handleDetailClick={handleDetailClick}
        />
      ))}
    </NoticeContainer>
  );
};

export default NoticeList;
