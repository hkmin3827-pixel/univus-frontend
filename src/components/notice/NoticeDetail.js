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
  white-space: pre-wrap;
`;

const NoticeImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  margin-bottom: 15px;
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

// 공지 상세
const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role"); // 교수 여부 확인

  const deleteNotice = () => {
    if (window.confirm("공지사항을 삭제하시겠습니까?")) {
      const delApi = async () => {
        try {
          const rsp = await AxiosApi.noticeDelete(id);
          if (rsp.data) {
            alert("삭제되었습니다.");
            navigate("/notice");
          }
        } catch (e) {
          console.log(e);
        }
      };
      delApi();
    }
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const rsp = await AxiosApi.noticeDetail(id);
        setNotice(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotice();
  }, [id]);

  return (
    <Container>
      {notice && (
        <>
          {notice.img && <NoticeImage src={notice.img} alt={notice.title} />}

          <Title>{notice.title}</Title>
          <Content>{notice.content}</Content>

          <PostDate>
            {notice.regDate && Commons.timeFromNow(notice.regDate)}
          </PostDate>
        </>
      )}

      <ButtonContainer>
        <Button onClick={() => navigate("/notice")}>목록</Button>

        {/* ★ role이 PROFESSOR인 경우에만 삭제 버튼 노출 */}
        {role === "PROFESSOR" && (
          <>
            <Button onClick={() => navigate(`/notice/edit/${id}`)}>수정</Button>
            <Button onClick={deleteNotice}>삭제</Button>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default NoticeDetail;
