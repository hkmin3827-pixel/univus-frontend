import React from "react";
import styled from "styled-components";
import NoticeListItem from "./NoticeListItem";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f6ff;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
`;

const NoticeWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const EmptyMessage = styled.p`
  padding: 20px;
  text-align: center;
  color: #777;
  font-size: 1.05rem;
`;

const NoticeList = ({ noticeList = [], handleDetailClick }) => {
  return (
    <Screen>
      <NoticeWrapper>
        {noticeList.length === 0 ? (
          <EmptyMessage>등록된 공지사항이 없습니다.</EmptyMessage>
        ) : (
          noticeList.map((notice) => (
            <NoticeListItem
              key={notice.id}
              notice={notice}
              handleDetailClick={handleDetailClick}
            />
          ))
        )}
      </NoticeWrapper>
    </Screen>
  );
};

export default NoticeList;
