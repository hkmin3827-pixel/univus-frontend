import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 33px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BackButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  font-size: 28px;
  align-self: flex-start;
  &:hover {
    color: #333;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #666;
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 26px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 2000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const DropdownButton = styled.button`
  border: none;
  background: white;
  padding: 10px 16px;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  &:hover {
    background: #f2f2f2;
  }
`;

const DateRow = styled.div`
  text-align: right;
  color: #777;
  font-size: 14px;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 22px;
`;

const FileBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${(p) => (p.delete ? "#ff5f5f" : "#5f5fff")};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const NoticeDetailPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await NoticeApi.getNotice(noticeId);
        setNotice(res.data);
      } catch (err) {
        alert("공지사항 조회 실패");
        navigate("/notice");
      }
    };
    load();
  }, [noticeId]);

  if (!notice) return <div>Loading...</div>;

  const isOwner = notice.email === localStorage.getItem("email");

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    await NoticeApi.deleteNotice(notice.id);
    alert("삭제되었습니다.");
    navigate("/notice");
  };

  const isImage = (fileName = "") => /.(png|jpg|jpeg|gif)$/i.test(fileName);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = notice.fileUrl;
    link.download = notice.fileName;
    link.click();
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const [datePart, timeWithMs] = dateTimeString.split("T");
    if (!timeWithMs) return datePart;
    const timePart = timeWithMs.split(".")[0];
    return `${datePart} ${timePart}`;
  };

  return (
    <Wrapper>
      <BackButton onClick={() => navigate("/notice")}>←</BackButton>{" "}
      <Title>{notice.title}</Title>
      <PostInfo>
        <WriterInfo>
          {notice.writerImage && <ProfileImg src={notice.writerImage} />}
          <span>{notice.email}</span>
          <span>· {new Date(notice.createTime).toLocaleDateString()}</span>
        </WriterInfo>

        <PostRight>
          {isOwner && (
            <>
              <MenuButton onClick={() => setDropdownOpen((prev) => !prev)}>
                <span className="material-symbols-outlined">more_vert</span>
              </MenuButton>
              {dropdownOpen && (
                <Dropdown>
                  <DropdownButton
                    onClick={() => navigate(`/notice/edit/${notice.id}`)}
                  >
                    수정
                  </DropdownButton>
                  <DropdownButton onClick={handleDelete}>삭제</DropdownButton>
                </Dropdown>
              )}
            </>
          )}
          <DateRow>{formatDateTime(notice.createTime)}</DateRow>
        </PostRight>
      </PostInfo>
      <Content>{notice.content}</Content>
      {notice.fileUrl && notice.fileName && (
        <FileBox>
          {isImage(notice.fileName) ? (
            <div>
              <img
                src={notice.fileUrl}
                alt="첨부 이미지"
                style={{
                  maxWidth: "50%",
                  borderRadius: "10px",
                  marginTop: "14px",
                }}
              />
              <p>
                <a href={notice.fileUrl} target="_blank" rel="noreferrer">
                  원본 이미지 보기
                </a>
              </p>
            </div>
          ) : (
            <div>
              <span style={{ fontWeight: "600" }}>첨부파일:&nbsp;</span>
              <button
                onClick={handleDownload}
                style={{
                  color: "#5566ff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  textDecoration: "underline",
                }}
              >
                {notice.fileName}
              </button>
            </div>
          )}
        </FileBox>
      )}
      {/* <ButtonArea>
        <Button onClick={() => navigate("/notice")}>목록으로</Button>
      </ButtonArea> */}
    </Wrapper>
  );
};

export default NoticeDetailPage;
