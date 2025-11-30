import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f3f4ff;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 900px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  font-size: 1.9rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
`;

const Meta = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 25px;
`;

const Content = styled.div`
  font-size: 1.08rem;
  line-height: 1.7;
  white-space: pre-wrap;
`;

const ButtonArea = styled.div`
  margin-top: 35px;
  display: flex;
  gap: 12px;
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

  return (
    <Wrapper>
      <Card>
        <Title>{notice.title}</Title>
        <Meta>
          작성자 {notice.email} · 작성일{" "}
          {new Date(notice.createTime).toLocaleDateString()}
        </Meta>
        <Content>{notice.content}</Content>

        {isOwner && (
          <ButtonArea>
            <Button onClick={() => navigate(`/notice/edit/${notice.id}`)}>
              수정
            </Button>
            <Button
              delete
              onClick={async () => {
                if (window.confirm("삭제하시겠습니까?")) {
                  await NoticeApi.deleteNotice(notice.id);
                  alert("삭제되었습니다.");
                  navigate("/notice");
                }
              }}
            >
              삭제
            </Button>
          </ButtonArea>
        )}
      </Card>
    </Wrapper>
  );
};

export default NoticeDetailPage;
