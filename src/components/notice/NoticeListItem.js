// 공지 목록의 한 항목 (컴포넌트)
import React from "react";
import styled from "styled-components";

const Item = styled.div`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Info = styled.div``;
const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 4px 8px;
  background-color: ${(props) => (props.delete ? "#ff5f5f" : "#5f5fff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const NoticeListItem = ({
  notice,
  handleDetailClick,
  handleEdit,
  handleDelete,
}) => {
  const currentEmail = localStorage.getItem("email");

  return (
    <Item>
      <Info onClick={() => handleDetailClick(notice.id)}>
        <strong>{notice.title}</strong> <br />
        <small>{notice.email}</small>
      </Info>
      {notice.email === currentEmail && (
        <Buttons>
          <Button onClick={() => handleEdit(notice.id)}>수정</Button>
          <Button delete onClick={() => handleDelete(notice.id)}>
            삭제
          </Button>
        </Buttons>
      )}
    </Item>
  );
};

export default NoticeListItem;
