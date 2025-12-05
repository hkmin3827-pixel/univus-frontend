import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeDetail from "../../components/notice/NoticeDetail";

const NoticeDetailPage = () => {
  const { teamId, noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await NoticeApi.getNotice(teamId, noticeId);
        setNotice(res.data);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          "공지사항 조회에 실패하였습니다.";

        alert(message);
        navigate(`/team/${teamId}/notice`);
      }
    };
    fetchNotice();
  }, [teamId, noticeId]);

  return (
    <div style={{ width: "100%" }}>
      <NoticeDetail
        notice={notice}
        onBack={() => navigate(`/team/${teamId}/notice`)}
        onEdit={() => navigate(`/team/${teamId}/notice/edit/${noticeId}`)}
        onDelete={async () => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
              await NoticeApi.deleteNotice(teamId, noticeId);
              alert("공지사항이 삭제되었습니다.");
              navigate(`/team/${teamId}/notice`);
            } catch (e) {
              const message =
                e.response?.data?.message ||
                e.response?.data ||
                "오류가 발생했습니다.";

              alert(message);
            }
          }
        }}
      />
    </div>
  );
};

export default NoticeDetailPage;
