// 공지 상세 조회 페이지
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoticeDetail from "../../components/notice/NoticeDetail";
import * as NoticeApi from "../../api/NoticeApi";

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
        console.error(err);
        alert("공지사항 조회 실패");
        navigate("/notice"); // 조회 실패 시 목록으로 이동
      }
    };

    fetchNotice();
  }, [noticeId, navigate]);

  if (!notice) return <div>Loading...</div>;

  return <NoticeDetail notice={notice} />;
};

export default NoticeDetailPage;
