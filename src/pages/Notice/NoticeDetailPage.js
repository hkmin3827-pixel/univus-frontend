import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeDetail from "../../components/notice/NoticeDetail";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const NoticeDetailPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await NoticeApi.getNotice(noticeId);
        setNotice(res.data);
      } catch (err) {
        alert("공지사항 조회 실패");
        navigate("/notice");
      }
    };
    fetchNotice();
  }, [noticeId]);

  return (
    <PageWrapper>
      <NoticeDetail
        notice={notice}
        onBack={() => navigate("/notice")}
        onEdit={() => navigate(`/notice/edit/${noticeId}`)} // 여기서 Edit 페이지로 이동
        onDelete={async () => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
              await NoticeApi.deleteNotice(noticeId);
              alert("공지사항이 삭제되었습니다.");
              navigate("/notice");
            } catch {
              alert("삭제 실패");
            }
          }
        }}
      />
    </PageWrapper>
  );
};

export default NoticeDetailPage;
