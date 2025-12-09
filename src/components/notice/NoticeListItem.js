import React from "react";
import styled from "styled-components";

const Item = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(194, 110, 110, 0.06);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: all 0.15s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

const Info = styled.div`
  max-width: 70%;
`;

const Title = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  color: #222;
`;

const Email = styled.div`
  margin-top: 6px;
  font-size: 0.9rem;
  color: #777;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  font-size: 0.9rem;
  background-color: ${(props) => (props.delete ? "#ff5f5f" : "#5f5fff")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.87;
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
        <Title>{notice.title}</Title>
        <Email>{notice.email}</Email>
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
