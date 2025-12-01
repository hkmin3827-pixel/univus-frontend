import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

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
  grid-template-columns: 1fr 2fr 150px;
  background: #e7e9ff;
  padding: 16px 20px;
  font-weight: 700;
  border-bottom: 2px solid #5f5fff;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 150px;
  padding: 16px 20px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  &:hover {
    background: #f7f8ff;
  }
`;

const NoResult = styled.div`
  padding: 30px;
  text-align: center;
  color: #777;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #d0d0d0;
  background: ${(props) => (props.disabled ? "#f1f1f1" : "white")};
  color: ${(props) => (props.disabled ? "#aaa" : "black")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const PageInfo = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const k = queryParams.get("keyword") || "";
    setKeyword(k);
    setPage(0);
  }, [location.search]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!keyword) return;
      try {
        const data = await AxiosApi.searchComments(keyword, page, 10);
        const arr = data.content || [];
        const total = data.totalPages || 1;
        setComments(arr);
        setTotalPages(total);

        // 정렬
        arr.sort((a, b) =>
          sort === "latest"
            ? new Date(b.createTime) - new Date(a.createTime)
            : new Date(a.createTime) - new Date(b.createTime)
        );

        setComments(arr);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("검색 요청 에러:", err);
        setComments([]);
        setTotalPages(1);
      }
    };
    fetchComments();
  }, [keyword, page, sort]);

  return (
    <PageWrapper>
      <Header>
        <Title>검색 결과: {keyword}</Title>
        <Controls>
          <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </SortSelect>
        </Controls>
      </Header>

      <ListWrapper>
        <HeadRow>
          <div>작성자</div>
          <div>내용</div>
          <div>작성일</div>
        </HeadRow>

        {comments.length === 0 ? (
          <NoResult>검색 결과가 없습니다.</NoResult>
        ) : (
          comments.map((c) => (
            <Row key={c.id} onClick={() => navigate(`/comment/detail/${c.id}`)}>
              <div>{c.userName}</div>
              <div>{c.content}</div>
              <div>{new Date(c.createTime).toLocaleDateString()}</div>
            </Row>
          ))
        )}
      </ListWrapper>

      <Pagination>
        <PageButton
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          이전
        </PageButton>
        <PageInfo>
          {page + 1} / {totalPages}
        </PageInfo>
        <PageButton
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        >
          다음
        </PageButton>
      </Pagination>
    </PageWrapper>
  );
};

export default SearchResultsPage;
