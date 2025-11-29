// 공지사항 수정 페이지
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoticeWrite from "../../components/notice/NoticeWrite";
import * as NoticeApi from "../../api/NoticeApi";

const NoticeEditPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);

  // 교수 권한 체크
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "PROFESSOR") {
      alert("공지사항 수정 권한이 없습니다.");
      navigate("/notice");
      return;
    }

    const fetchNotice = async () => {
      try {
        const res = await NoticeApi.getNotice(noticeId);
        setNotice(res.data);
      } catch (err) {
        console.error(err);
        alert("공지사항 조회 실패");
        navigate("/notice");
      }
    };

    fetchNotice();
  }, [noticeId, navigate, role]);

  if (!notice) return <div>Loading...</div>;

  return <NoticeWrite notice={notice} editMode={true} />;
};

export default NoticeEditPage;
