import React, { useState } from "react";
import styled from "styled-components";
import profileDefaultImg from "../../images/profileDefaultImg.png";
import { useNavigate, useParams } from "react-router-dom";
import TeamApi from "../../api/TeamApi";

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
`;

/* 제목 */
const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

/* 상단 정보 */
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

  span {
    font-size: 28px;
    color: #999;
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

  button {
    border: none;
    background: white;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 14px;
    text-align: left;
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

/* 파일 다운로드 박스 */
const FileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;

  /* 파일명 */
  span {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 버튼 */
  button {
    flex-shrink: 0;
    padding: 6px 12px;
  }

  /* 모바일 대응 */
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    span {
      white-space: normal; /* 줄바꿈 허용 */
      overflow: visible;
    }

    button {
      width: 100%; /* 버튼 폭 맞춤 */
    }
  }
`;

const FileButton = styled.button`
  background: #e6e6e6;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background: #dcdcdc;
  }
`;

const FileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 12px;
  flex: 1 1 100%;
  min-width: 0;

  img {
    max-width: 60px;
    max-height: 60px;
    border-radius: 4px;
    object-fit: cover;
  }

  span {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    flex-shrink: 0;
  }

  /* 모바일 대응 */
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;

    span {
      white-space: normal; /* 줄바꿈 허용 */
      overflow: visible;
    }

    button {
      width: 100%; /* 버튼 폭 맞춤 */
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }
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

  const handleFileDownload = () => {
    if (notice.fileUrl) {
      window.open(notice.fileUrl, "_blank");
    } else {
      alert("파일 URL이 없습니다.");
    }
  };

  return (
    <Container>
      <BackBtn onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
      </BackBtn>

      <Title>{notice.title}</Title>

      <InfoRow>
        <WriterRow>
          <WriterImg
            src={
              notice.professorImage?.trim()
                ? notice.professorImage
                : profileDefaultImg
            }
            alt="작성자이미지"
          />
          <span>
            {notice.professorName} ({notice.email}) 교수
          </span>
        </WriterRow>

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

      {/* 파일이 있을 경우 */}
      {notice.fileName && notice.fileUrl && (
        <FileContainer>
          <FileItem>
            {notice.fileUrl.match(/\.(jpeg|jpg|png|gif)$/i) && (
              <img src={notice.fileUrl} alt={notice.fileName} />
            )}
            <span>{notice.fileName}</span>
            <FileButton onClick={handleFileDownload}>다운로드</FileButton>
          </FileItem>
        </FileContainer>
      )}

      <Content>{notice.content}</Content>
    </Container>
  );
};

export default NoticeDetail;
