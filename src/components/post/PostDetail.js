import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Commons from "../../utils/Commons";

const Container = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #666;
  line-height: 1.5;
  white-space: pre-wrap; /* 줄바꿈 유지 */
`;

const CommentForm = styled.form`
  margin-top: 20px;
  clear: left;
`;

const PostImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 10px;
  float: left;

  @media (max-width: 600px) {
    float: none;
    width: 100%;
    height: auto;
    margin-right: 0;
  }
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0;
  padding: 0;
`;

const CommentEmail = styled.p`
  display: flex;
  justify-content: space-between;
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin: 0;
  padding: 0;
`;

const PostDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 15px;
`;

const FileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 12px); /* 2개씩 배치 */
  min-width: 120px;

  @media (max-width: 600px) {
    width: 100%; /* 모바일에서 한 줄 */
  }
`;

const FileThumbnail = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 6px;
`;

const FileLink = styled.a`
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [comAddFlag, setComAddFlag] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const email = localStorage.getItem("email");

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const delPostApi = async () => {
        try {
          const rsp = await AxiosApi.postDelete(id);
          if (rsp.data) {
            alert("게시글이 삭제되었습니다.");
            navigate("/board");
          }
        } catch (e) {
          const message =
            e.response?.data?.message ||
            e.response?.data ||
            "게시글 삭제에 실패하였습니다.";

          alert(message);
        }
      };
      delPostApi();
    }
  };

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await AxiosApi.postDetail(id);
        setPost(response.data);

        const response2 = await AxiosApi.commentList(id);
        setComments(response2.data || []);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          "오류가 발생했습니다.";

        alert(message);
      }
    };
    getPostDetail();
  }, [comAddFlag, id]);

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!inputComment.trim()) return;

    try {
      await AxiosApi.commentWrite(email, id, inputComment);
      setInputComment("");
      setComAddFlag((prev) => !prev);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "오류가 발생했습니다.";

      alert(message);
    }
  };

  return (
    <Container>
      {post && (
        <>
          {post.img && (
            <PostImage src={post.img} alt={post.title || "Board image"} />
          )}
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
          {post.regDate && (
            <PostDate>{Commons.timeFromNow(post.regDate)}</PostDate>
          )}

          {/* 파일/이미지 표시 */}
          {post.files && post.files.length > 0 && (
            <FileContainer>
              {post.files.map((file, idx) => (
                <FileItem key={idx}>
                  {file.fileUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                    <FileThumbnail src={file.fileUrl} alt={file.fileName} />
                  ) : (
                    <FileLink
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 {file.fileName}
                    </FileLink>
                  )}
                </FileItem>
              ))}
            </FileContainer>
          )}
        </>
      )}

      <ButtonContainer>
        <Button onClick={toggleComments}>
          {showComments
            ? "댓글 숨기기"
            : `댓글 ${comments ? comments.length : 0}개 보기`}
        </Button>
        {email && post && email === post.email && (
          <Button onClick={deletePost}>삭제</Button>
        )}
      </ButtonContainer>

      <CommentForm onSubmit={handleSubmitComment}>
        <label>
          <CommentInput
            type="text"
            value={inputComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요"
          />
        </label>
        <SubmitButton type="submit">댓글 추가</SubmitButton>
      </CommentForm>

      {showComments && (
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.commentId}>
              <CommentEmail>
                <p>{comment.email}</p>
                <p>{Commons.timeFromNow(comment.regDate)}</p>
              </CommentEmail>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      )}
    </Container>
  );
};

export default PostDetail;
