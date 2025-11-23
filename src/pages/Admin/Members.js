import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import {styled} from "styled-components";


const Container = styled.div`
  display: flex;
  width: 100%;
  direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
`;

const MemberInfoWrapper = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #e5d9f2;
`;

const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const MemberName = styled.span`
  font-style: italic;
  font-size: 1.2rem;
  color: #333;
  margin: 10px;
`;

const MemberEmail = styled.span`
  color: #555;
  margin-right: px;
  margin-bottom: 10px;
`;






const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState("");
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const role = localStorage.getItem("role"); // "ADMIN" / "STUDENT" / "PROFESSOR"

    // 로그인 안 했거나 ADMIN이 아니면 접근 차단
    if (isLogin !== "TRUE" || role !== "ADMIN") {
      alert("관리자만 접근 가능합니다.");
      navigate("/home", { replace: true }); // 메인 또는 로그인 등으로 보내기 (replace: true는 사용자가 뒤로가기로 다시 돌아오는걸 막기 위해)
    };

    const getMembers = async () => {
      try {
        const rsp= await AxiosApi.members();
        if (rsp.status === 200) setMembers(rsp.data);
      console.log(rsp.data);
      } catch (e) {
        alert("서버가 응답하지 않습니다.");
      }
    };

    getMembers();
  }, []);
  
const onClickMember = (email) => {
    console.log("onCLick member : " + email);
    navigate(`/user/${email}`);
  };


  return (
    <>
      {/* members 렌더링 영역 */}
      <div>
        {localStorage.getItem("role") !== "ADMIN" ? null : 
        <Container>
      {members &&
        members.map((member) => (
          <MemberInfoWrapper
            key={member.email}
            onClick={() => onClickMember(member.email)}
          >
            <UserImage src={member.image} />
            <UserInfo>
              <MemberName>이름: {member.name}</MemberName>
              <MemberEmail>이메일: {member.email}</MemberEmail>
            </UserInfo>
          </MemberInfoWrapper>
        ))}
    </Container> }
      </div>
    </>
  );
};

export default Members;
