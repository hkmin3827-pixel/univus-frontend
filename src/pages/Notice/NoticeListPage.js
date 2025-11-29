import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import NoticeListItem from "../../components/notice/NoticeListItem";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;
const Button = styled.button`
  padding: 8px 16px;
  background-color: #5f5fff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const SortSelect = styled.select`
  padding: 6px 12px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;

const NoticeListPage = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);
  const [sort, setSort] = useState("latest");

  const fetchList = async () => {
    try {
      const res = await NoticeApi.getNoticeList();
      const notices = res.data?.content || [];
      notices.sort((a, b) =>
        sort === "latest"
          ? new Date(b.createTime) - new Date(a.createTime)
          : new Date(a.createTime) - new Date(b.createTime)
      );
      setNoticeList(notices);
    } catch (err) {
      console.error(err);
      alert("공지 목록 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchList();
  }, [sort]);

  const handleDetailClick = (id) => navigate(`/notice/detail/${id}`);
  const handleEdit = (id) => navigate(`/notice/edit/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await NoticeApi.deleteNotice(id);
      alert("공지사항이 삭제되었습니다.");
      fetchList(); // 삭제 후 목록 갱신
    } catch (err) {
      console.error(err);
      alert("공지사항 삭제 실패");
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>공지사항</Title>
        <div>
          <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </SortSelect>
          <Button onClick={() => navigate("/notice/create")}>공지 작성</Button>
        </div>
      </Header>
      <Divider />
      {noticeList.length === 0 ? (
        <p>등록된 공지사항이 없습니다.</p>
      ) : (
        noticeList.map((notice) => (
          <NoticeListItem
            key={notice.id}
            notice={notice}
            handleDetailClick={handleDetailClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}
    </PageContainer>
  );
};

export default NoticeListPage;
