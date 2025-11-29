import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoticeWrite from "../../components/notice/NoticeWrite";
import * as NoticeApi from "../../api/NoticeApi";

const NoticeEditPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeId, navigate, role]);

  const handleSubmit = async () => {
    if (!notice.title.trim() || !notice.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await NoticeApi.updateNotice(noticeId, notice);
      alert("공지사항이 수정되었습니다.");
      navigate(`/notice/detail/${noticeId}`);
    } catch (err) {
      console.error(err);
      alert("공지사항 수정 실패");
    }
  };

  if (loading || !notice) return <div>Loading...</div>;

  return (
    <NoticeWrite
      notice={notice}
      setNotice={setNotice}
      onSubmit={handleSubmit}
      editMode={true}
      onCancel={() => navigate(`/notice/detail/${noticeId}`)}
    />
  );
};

export default NoticeEditPage;
