import React from "react";
import styled from "styled-components";
import NoticeListItem from "./NoticeListItem";

const NoticeUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const EmptyMessage = styled.p`
  padding: 16px 4px;
  color: #777;
  text-align: center;
  font-size: 0.95rem;
`;

/**
 * 공지사항 목록 컴포넌트
 * @param {Array} noticeList - 공지 배열 (NoticeResDto 구조)
 * @param {Function} handleDetailClick - 공지 클릭 시 호출되는 함수 - id 전달
 */
const NoticeList = ({ noticeList = [], handleDetailClick }) => {
  if (!noticeList || noticeList.length === 0) {
    return <EmptyMessage>등록된 공지사항이 없습니다.</EmptyMessage>;
  }

  return (
    <NoticeUl>
      {noticeList.map((notice) => (
        <NoticeListItem
          key={notice.id} // NoticeResDto의 PK
          notice={notice}
          handleDetailClick={handleDetailClick}
        />
      ))}
    </NoticeUl>
  );
};

export default NoticeList;
