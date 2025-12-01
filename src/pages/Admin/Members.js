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

const Header = styled.div`
display: flex;
width:100%;
padding-bottom: 20px;
border-bottom: 1px solid #A294F9;
`
const FilterSection = styled.div`
  margin-top: 20px;     /* 위 간격 */
  margin-bottom: 10px;  /* 아래 간격 */
  width: 100%;
`;

const FilterTitle = styled.div`
  font-size: 1rem;
  margin: 10px 0 6px 0;
  font-weight: 700;
  color: #333;
  border-bottom: 1px solid #A294F9;
`;

const MemberInfoWrapper = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #f5efff;
`

const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  cursor: pointer;
`

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`

const MemberName = styled.span`
  font-style: italic;
  font-size: 1.2rem;
  color: #333;
  margin: 10px;
`

const MemberDetail = styled.span`
  color: #555;
  margin-bottom: 10px;
`

const FilterContainer = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  width: 100%; /* 영역 전체 사용 */
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #A294F9;
  background-color: ${({ active }) => (active ? "#A294F9" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.9;
  }
`;






const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filterRole, setFilterRole] = useState("ALL"); // 전체 / ADMIN / STUDENT / PROFESSOR
  const [statusFilter, setStatusFilter] = useState("ALL"); // 전체 / ACTIVE / INACTIVE

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
        const rsp= await AxiosApi.adminMembers();
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
    navigate(`${email}`);
  };


  const roleMap = {
  ADMIN: "관리자",
  STUDENT: "학생",
  PROFESSOR: "교수",
};

const filteredMembers = members.filter((member) => {
       // 역할 필터
   const roleMatch =
     filterRole === "ALL" || member.role === filterRole;

   // 상태 필터
   const statusMatch =
     statusFilter === "ALL" ||
     (statusFilter === "ACTIVE" && member.active) ||
     (statusFilter === "INACTIVE" && !member.active);

   return roleMatch && statusMatch;
  });

  return (
  <>
    <div>
      {localStorage.getItem("role") !== "ADMIN" ? null : (
        <Container>
          <Header>
            <h1>어드민 페이지 - 회원정보조회</h1>
          </Header>

          {/* 역할 필터 버튼 영역 */}
          <FilterSection>
          <FilterTitle>역할 필터</FilterTitle>
          <FilterContainer> 
          
            <FilterButton
              active={filterRole === "ALL"}
              onClick={() => setFilterRole("ALL")}
            >
              전체
            </FilterButton>
            <FilterButton
              active={filterRole === "ADMIN"}
              onClick={() => setFilterRole("ADMIN")}
            >
              관리자
            </FilterButton>
            <FilterButton
              active={filterRole === "PROFESSOR"}
              onClick={() => setFilterRole("PROFESSOR")}
            >
              교수
            </FilterButton>
            <FilterButton
              active={filterRole === "STUDENT"}
              onClick={() => setFilterRole("STUDENT")}
            >
              학생
            </FilterButton>
          </FilterContainer>
          </FilterSection>
          {/* 상태 필터 버튼 영역 */}
          <FilterSection>
          <FilterTitle>상태 필터</FilterTitle>
        <FilterContainer>
           <FilterButton
             active={statusFilter === "ALL"}
             onClick={() => setStatusFilter("ALL")}
           >
             전체
           </FilterButton>
           <FilterButton
             active={statusFilter === "ACTIVE"}
             onClick={() => setStatusFilter("ACTIVE")}
           >
             활성
           </FilterButton>
           <FilterButton
             active={statusFilter === "INACTIVE"}
             onClick={() => setStatusFilter("INACTIVE")}
           >
             비활성
           </FilterButton>
         </FilterContainer>
         </FilterSection>


          {filteredMembers &&
            filteredMembers.map((member) => (
              <MemberInfoWrapper
                key={member.email}
                onClick={() => onClickMember(member.email)}
              >
                <UserImage src={member.image} />
                <UserInfo>
                  <MemberName>이름: {member.name}</MemberName>
                  <MemberDetail>이메일: {member.email}</MemberDetail>
                  <MemberDetail>
                    역할: {member.role === "ADMIN"
                      ? "관리자"
                      : member.role === "PROFESSOR"
                      ? "교수"
                      : member.role === "STUDENT"
                      ? "학생"
                      : member.role}
                  </MemberDetail>
                  <MemberDetail>
                    상태: {member.active ? "활성" : "비활성"}
                  </MemberDetail>
                </UserInfo>
              </MemberInfoWrapper>
            ))}
        </Container>
      )}
    </div>
  </>
);

};

export default Members;
