import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        navigate("/notice");
      }
    };
    fetchNotice();
  }, [noticeId, navigate]);

  if (!notice) return <div>Loading...</div>;

  const currentEmail = localStorage.getItem("email");

  const handleEdit = () => navigate(`/notice/edit/${notice.id}`);
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await NoticeApi.deleteNotice(notice.id);
      alert("공지사항이 삭제되었습니다.");
      navigate("/notice");
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>{notice.title}</h2>
      <p>작성자: {notice.email}</p>
      <p>{notice.content}</p>
      {notice.email === currentEmail && (
        <>
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </div>
  );
};

export default NoticeDetailPage;
