import React from "react";
import styled from "styled-components";
import Commons from "../../utils/Commons";

const PostImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px;
  object-fit: cover;
  flex-shrink: 0;
`;

const PostLi = styled.li`
  background-color: #f2f2f2;
  margin: 10px 0;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e9f4ff;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.4em;
  color: #007bff;
  margin: 0 0 10px;
`;

const PostContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
  margin: 0;
`;

const PostContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-top: 10px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const UserId = styled.span`
  color: #555;
  font-style: italic;
  font-size: 13px;
  white-space: nowrap;
`;

const PostListItem = ({ post, handleDetailClick }) => {
  const onClick = () => {
    handleDetailClick(post.postId);
  };

  return (
    <PostLi onClick={onClick}>
      <PostImage
        src={post.img || "https://via.placeholder.com/120"}
        alt={post.title || "Board image"}
      />
      <PostContentWrapper>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <UserId>작성자: {post.email}</UserId>
        </PostHeader>
        <PostContent>{post.content}</PostContent>
        <PostDate>
          {post.regDate ? Commons.timeFromNow(post.regDate) : ""}
        </PostDate>
      </PostContentWrapper>
    </PostLi>
  );
};

export default PostListItem;
