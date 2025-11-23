// import React, { useEffect, useState } from "react";
// import AxiosApi from "../api/AxiosApi";
// import styled from "styled-components";
// import { useParams, useNavigate } from "react-router-dom";
// import PostList from "../components/post/PostLIst";

// const Container = styled.div`
//   padding: 0 30px;
//   position: relative;
//   margin-bottom: 40px;
// `;

// const Title = styled.h1`
//   color: #333;
//   text-align: center;
// `;

// const CircleFixedButton = styled.button`
//   position: fixed;
//   bottom: 24px;
//   right: 30px;
//   z-index: 10;

//   width: 60px;
//   height: 60px;
//   border-radius: 50%;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   background-color: #1da1f2;
//   color: white;
//   font-size: 30px;
//   line-height: 1;
//   box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);

//   border: none;
//   cursor: pointer;

//   &:hover {
//     background-color: #1991db;
//   }

//   &:before {
//     content: "+";
//   }
// `;

// const PaginationWrapper = styled.div`
//   margin-top: 24px;
//   display: flex;
//   justify-content: center;
//   gap: 8px;
// `;

// const PageButton = styled.button`
//   min-width: 32px;
//   padding: 6px 10px;
//   border-radius: 4px;
//   border: 1px solid #ddd;
//   background-color: ${({ $active }) => ($active ? "#1da1f2" : "#fff")};
//   color: ${({ $active }) => ($active ? "#fff" : "#333")};
//   font-size: 0.9rem;
//   cursor: pointer;

//   &:disabled {
//     opacity: 0.4;
//   }
// `;

// const Post = () => {
//   const { boardId } = useParams();
//   const [postList, setPostList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const [page, setPage] = useState(0);
//   const [size] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const fetchPostList = async () => {
//       try {
//         setLoading(true);
//         const rsp = await AxiosApi.postListPaged(boardId, page, size);
//         const data = rsp.data;

//         setPostList(data.content);
//         setTotalPages(data.totalPages);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPostList();
//   }, [boardId, page, size]);

//   const handleWriteClick = () => {
//     navigate(`/post/create/${boardId}`);
//   };

//   const handleDetailClick = (postId) => {
//     navigate(`/post/detail/${postId}`);
//   };

//   const goToPage = (idx) => {
//     if (idx < 0 || idx >= totalPages) return;
//     setPage(idx);
//   };

//   return (
//     <Container>
//       <Title>게시판 목록</Title>

//       {loading ? (
//         <p style={{ textAlign: "center", marginTop: "20px" }}>로딩 중...</p>
//       ) : (
//         <>
//           <PostList postList={postList} handleDetailClick={handleDetailClick} />

//           {totalPages > 1 && (
//             <PaginationWrapper>
//               <PageButton
//                 onClick={() => goToPage(page - 1)}
//                 disabled={page === 0}
//               >
//                 이전
//               </PageButton>

//               {Array.from({ length: totalPages }, (_, i) => (
//                 <PageButton
//                   key={i}
//                   $active={i === page}
//                   onClick={() => goToPage(i)}
//                 >
//                   {i + 1}
//                 </PageButton>
//               ))}

//               <PageButton
//                 onClick={() => goToPage(page + 1)}
//                 disabled={page === totalPages - 1}
//               >
//                 다음
//               </PageButton>
//             </PaginationWrapper>
//           )}
//         </>
//       )}

//       <CircleFixedButton onClick={handleWriteClick} />
//     </Container>
//   );
// };

// export default Post;

const Post = () => {
  return (
    <div className="page-container">
      <h1>게시판 목록</h1>
      <p>등록된 게시글이 없습니다.</p>

      <button className="floating-btn">+</button>
    </div>
  );
};

export default Post;
