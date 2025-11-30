import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as NoticeApi from "../../api/NoticeApi";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f3f4ff;
  padding: 50px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #222;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #5f5fff;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const SortSelect = styled.select`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const ListWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const HeadRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 150px;
  background: #e7e9ff;
  padding: 16px 20px;
  font-weight: 700;
  border-bottom: 2px solid #5f5fff;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 150px;
  padding: 16px 20px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  &:hover {
    background: #f7f8ff;
  }
`;

const NoticeListPage = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);
  const [sort, setSort] = useState("latest");

  const fetchList = async () => {
    try {
      const res = await NoticeApi.getNoticeList();
      const arr = res.data?.content || [];

      arr.sort((a, b) =>
        sort === "latest"
          ? new Date(b.createTime) - new Date(a.createTime)
          : new Date(a.createTime) - new Date(b.createTime)
      );

      setNoticeList(arr);
    } catch {
      alert("공지 목록 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchList();
  }, [sort]);

  return (
    <PageWrapper>
      <Header>
        <Title>공지사항</Title>

        <Controls>
          <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </SortSelect>

          <Button onClick={() => navigate("/notice/create")}>공지 작성</Button>
        </Controls>
      </Header>

      <ListWrapper>
        <HeadRow>
          <div>제목</div>
          <div>작성자</div>
          <div>작성일</div>
        </HeadRow>

        {noticeList.map((n) => (
          <Row key={n.id} onClick={() => navigate(`/notice/detail/${n.id}`)}>
            <div>{n.title}</div>
            <div>{n.email}</div>
            <div>{new Date(n.createTime).toLocaleDateString()}</div>
          </Row>
        ))}

        {noticeList.length === 0 && (
          <div style={{ padding: "30px", textAlign: "center", color: "#777" }}>
            등록된 공지사항이 없습니다.
          </div>
        )}
      </ListWrapper>
    </PageWrapper>
  );
};

export default NoticeListPage;
