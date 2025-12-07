import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";

const MemberDetails = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); //버튼 처리 중 여부

const Container = styled.div`
  display: flex;
  width: 100%;
  direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
  padding: 2%;
`;

const Box = styled.div`
display: flex;
width: 100%;
flex-wrap: wrap;
padding: 1%;  
border: 1px solid #A294F9;

@media (max-width: 960px){
  padding: 5%;
}
`

const Header = styled.div`
display: flex;
width:100%;
padding-bottom: 20px;
border-bottom: 1px solid #A294F9;
`;

const Title = styled.h1`
  font-size: 24px;

  @media (max-width: 960px) {
    font-size: 18px;
  }
`;

  const Body = styled.div`
    width: 100%;
    padding: 20px;
  `;
  const ProfileLine = styled.p`
    margin: 8px 0 4px;
  `;

  const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) 기본 member 정보 가져오기 (role 확인용)
        const rsp = await AxiosApi.detailmembersbyAdmin(email);
        const baseMember = rsp.data;
        setMember(baseMember);

        let profileRsp;

        // 2) 역할(student / professor)에 따라 API 다르게 호출
        if (baseMember.role === "STUDENT") {
          profileRsp = await AxiosApi.getStudentProfile(email);
        } else if (baseMember.role === "PROFESSOR") {
          profileRsp = await AxiosApi.getProfessorProfile(email);
        } else {
          profileRsp = { data: null };
        }

        setProfile(profileRsp.data);

      } catch (err) {
        console.error(err);
        alert("회원 정보를 불러오지 못했습니다.");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, navigate]);
  
  const refreshMember = async () => {
    try {
      const rsp = await AxiosApi.detailmembersbyAdmin(email);
      setMember(rsp.data);
    } catch (err) {
      console.error(err);
      alert("회원 정보를 다시 불러오지 못했습니다.");
    }
  };

//관리자: 회원 탈퇴 처리
const handleAdminDelete = async () => {
  if(!member) return;
  if(!window.confirm("해당 회원을 비활성하시겠습니까?"))return;

  try {
    setProcessing(true);
    await AxiosApi.adminaccountWithdraw(member.email);
    alert("회원이 비활성 처리되었습니다.");
    await refreshMember();
  }catch (err) {
    console.error(err);
    alert("회원 비활성 처리에 실패했습니다.");
  }finally {
    setProcessing(false);
  }
};

const handleAdminRecover = async () => {
    if (!member) return;
    if (!window.confirm("해당 회원을 다시 활성화하시겠습니까?")) return;

    try {
      setProcessing(true);
      await AxiosApi.adminaccountRecover(member.email);
      alert("회원이 다시 활성화되었습니다.");
      await refreshMember();
    } catch (err) {
      console.error(err);
      alert("회원 활성화에 실패했습니다.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div>불러오는 중입니다.</div>;
  if (!member) return <div>회원 정보가 없습니다.</div>;

  const isActive = member.active;
  return (
    <Container>
      <Box>
      <Header>
        <Title>회원 상세 정보</Title>
      </Header>

      <Body>
        <ProfileLine><strong>이름:</strong> {member.name}</ProfileLine>
        <ProfileLine><strong>이메일:</strong> {member.email}</ProfileLine>
        <ProfileLine><strong>역할:</strong> {member.role}</ProfileLine>
        <ProfileLine>
          <strong>상태:</strong> {isActive ? "활성" : "비활성"}
        </ProfileLine>

        {/* 3) role에 따라 표시할 프로필 값 */}
        {profile && member.role === "STUDENT" && (
          <>
            <ProfileLine><strong>학번:</strong> {profile.studentNumber}</ProfileLine>
            <ProfileLine><strong>전공:</strong> {profile.major}</ProfileLine>
            <ProfileLine><strong>학년:</strong> {profile.grade}</ProfileLine>
          </>
        )}

        {profile && member.role === "PROFESSOR" && (
          <>
            <ProfileLine><strong>전공:</strong> {profile.major}</ProfileLine>
            <ProfileLine><strong>연구 분야:</strong> {profile.field}</ProfileLine>
          </>
        )}
      </Body>
      <ButtonRow>
          {/* 관리자 회원 탈퇴(비활성) 버튼 */}
          {member.role !== "ADMIN" &&(
            <>
          <ActionButton
            onClick={handleAdminDelete}
            disabled={!isActive || processing}
          >
            비활성
          </ActionButton>

          {/* 관리자 회원 복구(활성) 버튼 */}
          <ActionButton
            onClick={handleAdminRecover}
            disabled={isActive || processing}
          >
            활성
          </ActionButton>
          </>
          )}

      <ActionButton onClick={() => navigate(-1)}>뒤로가기</ActionButton>
      </ButtonRow>
      </Box>
    </Container>
  );
};

export default MemberDetails;
