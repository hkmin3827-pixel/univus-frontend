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

const Container = styled.div`
  display: flex;
  width: 100%;
  direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
`;

const Header = styled.div`
display: flex;
width:100%;
padding-bottom: 20px;
border-bottom: 1px solid #A294F9;
`
  const Body = styled.div`
    width: 100%;
    padding: 20px;
  `;
  const ProfileLine = styled.p`
    margin: 8px 0 4px;
  `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) 기본 member 정보 가져오기 (role 확인용)
        const rsp = await AxiosApi.detailmembers(email);
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

  if (loading) return <div>불러오는 중입니다.</div>;
  if (!member) return <div>회원 정보가 없습니다.</div>;

  return (
    <Container>
      <Header>
        <h1>회원 상세 정보</h1>
      </Header>

      <Body>
        <ProfileLine><strong>이름:</strong> {member.name}</ProfileLine>
        <ProfileLine><strong>이메일:</strong> {member.email}</ProfileLine>
        <ProfileLine><strong>역할:</strong> {member.role}</ProfileLine>

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

      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </Container>
  );
};

export default MemberDetails;
