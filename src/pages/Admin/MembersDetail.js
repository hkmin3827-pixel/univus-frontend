import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";

const MemberDetails = () => {
  const { email } = useParams(); // /user/:email 에서 들어온 값
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const rsp = await AxiosApi.detailmembers(email);
        setMember(rsp.data);
      } catch (err) {
        alert("회원 정보를 불러오지 못했습니다.");
        navigate("/members"); // 실패 시 목록으로 돌려보냄 (경로는 네 프로젝트에 맞게)
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [email, navigate]);

  if (loading) return <div>불러오는 중입니다.</div>;
  if (!member) return <div>회원 정보가 없습니다.</div>;

  return (
    <div style={{ padding: "16px" }}>
      <h2>회원 상세 정보</h2>
      <p><strong>이름:</strong> {member.name}</p>
      <p><strong>이메일:</strong> {member.email}</p>
      <p><strong>역할:</strong> {member.role}</p>
      {/* 백엔드에서 더 내려주는 값 있으면 여기 추가 (학번, 전공, 가입일 등) */}
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default MemberDetails;