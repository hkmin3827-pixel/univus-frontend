import React, { useState } from "react";
import styled from "styled-components";
import profileDefaultImg from "../../images/profileDefaultImg.png";

/* 컨테이너 */
const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 33px auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 940px) {
    margin: 5px auto;
  }
`;

/* 뒤로가기 버튼 */
const BackBtn = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  align-self: flex-start;

  span {
    font-size: 28px;
    transition: 0.15s;
  }

  &:hover span {
    color: #333;
  }

  &:active span {
    color: #333;
  }
`;

/* 제목 */
const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

/* 상단 정보: 프로필 + 작성자 + 메뉴 + 날짜 */
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #666;
`;

const WriterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WriterImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

/* 우측 메뉴 */
const RightMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 28px;
    color: #999;
    transition: 0.15s;
  }

  &:hover span {
    color: #333;
  }

  &:active span {
    color: #333;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 26px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  z-index: 2000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

  button {
    border: none;
    background: white;
    padding: 10px 16px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
  }

  button:hover {
    background: #f2f2f2;
  }
`;

const DateText = styled.span`
  color: #777;
  font-size: 14px;
`;

/* 구분선 */
const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #ececec;
  margin: 3px 0;
`;

/* 본문 */
const Content = styled.div`
  font-size: 18px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 22px;
`;

const NoticeDetail = ({ notice, onBack, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  if (!notice) return null;

  const formatDateTime = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(
      2,
      "0"
    )}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <Container>
      <BackBtn onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
      </BackBtn>

      <Title>{notice.title}</Title>

      <InfoRow>
        {/* 프로필 + 작성자 */}
        <WriterRow>
          <WriterImg
            src={
              notice.professorImage && notice.professorImage.trim() !== ""
                ? notice.professorImage
                : profileDefaultImg
            }
            alt="작성자"
          />
          <span className="writer">
            {notice.professorName} ({notice.email})
          </span>
        </WriterRow>

        {/* 오른쪽 메뉴 + 날짜 */}
        <RightMenu>
          <MenuButton onClick={() => setMenuOpen((prev) => !prev)}>
            <span className="material-symbols-outlined">more_vert</span>
          </MenuButton>

          {menuOpen && (
            <Dropdown>
              <button onClick={onEdit}>수정</button>
              <button onClick={onDelete}>삭제</button>
            </Dropdown>
          )}

          <DateText>{formatDateTime(notice.createTime)}</DateText>
        </RightMenu>
      </InfoRow>

      <Divider />

      <Content>{notice.content}</Content>
    </Container>
  );
};

export default NoticeDetail;
