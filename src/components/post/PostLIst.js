import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

const PostUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const EmptyMessage = styled.p`
  padding: 16px 4px;
  color: #777;
  text-align: center;
  font-size: 0.95rem;
`;

/**
 * 게시글 목록 컴포넌트
 * @param {Array} postList - 게시글 배열 (BoardResDto와 동일 구조)
 * @param {Function} handleDetailClick - 게시글 클릭 시 호출되는 함수 (id 인자 전달)
 */
const PostList = ({ postList = [], handleDetailClick }) => {
  if (!postList || postList.length === 0) {
    return <EmptyMessage>등록된 게시글이 없습니다.</EmptyMessage>;
  }

  return (
    <PostUl>
      {postList.map((post) => (
        <PostListItem
          key={post.postId} // BoardResDto.boardId와 매칭
          post={post}
          handleDetailClick={handleDetailClick}
        />
      ))}
    </PostUl>
  );
};

export default PostList;
