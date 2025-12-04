import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeDetail from "../../components/notice/NoticeDetail";

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
    <div style={{ width: "100%" }}>
      <NoticeDetail
        notice={notice}
        onBack={() => navigate("/notice")}
        onEdit={() => navigate(`/notice/edit/${noticeId}`)}
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
    </div>
  );
};

export default NoticeDetailPage;
