// 공지사항 리스트 조회
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeList from "../../components/notice/NoticeList";

const NoticeListPage = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await NoticeApi.getNoticeList();
        setNoticeList(res.data);
      } catch (err) {
        console.error(err);
        alert("공지 목록 불러오기 실패");
      }
    };
    fetchList();
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/notice/detail/${id}`);
  };

  return (
    <NoticeList noticeList={noticeList} handleDetailClick={handleDetailClick} />
  );
};

export default NoticeListPage;
