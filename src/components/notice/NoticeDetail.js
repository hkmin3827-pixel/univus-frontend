import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 36px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${(props) => props.size || "26px"};
  color: #999;
  transition: 0.1s;

  &:hover {
    color: #3737ff; /* hover 진한 보라 */
  }
  &:active {
    color: #3737ff; /* 눌렀을 때 */
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  background: none;
  font-size: 26px;
  cursor: pointer;
  color: #999;
  z-index: 9999;

  &:hover {
    color: #3737ff;
  }
  &:active {
    color: #3737ff;
  }
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NameText = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const TimeText = styled.span`
  font-size: 13px;
  color: #666;
`;

const MoreMenu = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 120px;
  z-index: 10;
`;

const MenuItem = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.red ? "red" : "#333")};

  &:hover {
    background: #f3f4ff;
  }
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
`;

const FileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileLink = styled.button`
  background: none;
  border: none;
  color: #5f5fff;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
`;

const NoticeDetail = ({ notice, onBack, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  /* ----------------------------
     (1) 메뉴 외부 클릭 감지
     ---------------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!notice) return null;

  /* ----------------------------
     (2) 생성 시간 포맷 정리
     ---------------------------- */
  const formatDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  };

  const dateObj = formatDate(notice.createTime);

  const formattedTime = dateObj
    ? `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(dateObj.getDate()).padStart(2, "0")} 
     ${String(dateObj.getHours()).padStart(2, "0")}:${String(
        dateObj.getMinutes()
      ).padStart(2, "0")}`
    : "작성 시간 정보 없음";

  /* ----------------------------
     (3) 파일 다운로드
     ---------------------------- */
  const handleDownload = () => {
    if (!notice.fileUrl) return;
    const link = document.createElement("a");
    link.href = notice.fileUrl;
    link.download = notice.fileName;
    link.click();
  };

  const isImage = (file = "") => /\.(png|jpg|jpeg|gif)$/i.test(file);

  return (
    <>
      <Container>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>{notice.title}</Title>

        <HeaderRow>
          {/* 작성자 정보 */}
          <ProfileRow>
            {notice.professorImage && (
              <ProfileImg src={notice.professorImage} />
            )}
            <InfoColumn>
              <NameText>
                {notice.professorName} ({notice.email})
              </NameText>
              <TimeText>{formattedTime}</TimeText>
            </InfoColumn>
          </ProfileRow>

          {/* ...(더보기) 메뉴 */}
          <div style={{ position: "relative" }} ref={menuRef}>
            <IconButton size="22px" onClick={() => setMenuOpen((p) => !p)}>
              ⋮
            </IconButton>

            {menuOpen && (
              <MoreMenu>
                <MenuItem onClick={onEdit}>수정</MenuItem>
                <MenuItem red onClick={onDelete}>
                  삭제
                </MenuItem>
              </MoreMenu>
            )}
          </div>
        </HeaderRow>

        {/* 본문 */}
        <Content>{notice.content}</Content>

        {/* 첨부파일 */}
        {notice.fileUrl && (
          <FileSection>
            <span style={{ fontWeight: 600 }}>첨부파일</span>

            {isImage(notice.fileName) ? (
              <>
                <img
                  src={notice.fileUrl}
                  alt="첨부 이미지"
                  style={{ maxWidth: "60%", borderRadius: "10px" }}
                />
                <a href={notice.fileUrl} target="_blank" rel="noreferrer">
                  원본 보기
                </a>
              </>
            ) : (
              <FileLink onClick={handleDownload}>{notice.fileName}</FileLink>
            )}
          </FileSection>
        )}
      </Container>
    </>
  );
};

export default NoticeDetail;
