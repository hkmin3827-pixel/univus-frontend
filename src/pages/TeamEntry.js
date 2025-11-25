// src/pages/TeamEntry.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamApi from "../api/TeamApi";

const TeamEntry = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [inviteInfo, setInviteInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await TeamApi.getInviteInfo(token);
        setInviteInfo(res.data);
        if (res.data.expired) {
          setErrorMsg("초대 링크가 만료되었습니다.");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("유효하지 않은 초대 링크입니다.");
      }
    };
    fetchInvite();
  }, [token]);

  const acceptInvite = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await TeamApi.acceptInvite(token);
      setSuccessMsg("팀에 가입되었습니다!");

      if (inviteInfo) {
        setTimeout(() => {
          navigate(`/teams/${inviteInfo.teamId}`);
        }, 1000);
      }
    } catch (err) {
      console.error("초대 수락 에러:", err);

      const status = err.response?.status;

      // 🔥 401 = 로그인 안 함
      if (status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/"); // ← 로그인 페이지 path 맞게 수정!
        return;
      }

      // 🔥 스프링 기본 리다이렉트(302)도 로그인 필요 케이스 (전역 CORS 설정 없을 때)
      if (status === 302) {
        alert("로그인이 필요합니다.");
        navigate("/");
        return;
      }

      // 🔥 이미 처리된 초대 or 토큰 문제 (400)
      if (status === 400) {
        setErrorMsg(err.response?.data?.message || "초대 수락에 실패했습니다.");
        return;
      }

      // 그 외 에러
      setErrorMsg("초대 수락 중 문제가 발생했습니다.");
    }
  };

  if (!inviteInfo && !errorMsg) return <div>로딩중...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>팀 초대</h2>

      {inviteInfo && (
        <>
          <p>
            <b>{inviteInfo.teamName}</b> 팀에서 초대했습니다.
          </p>
          <p>
            초대한 사람: {inviteInfo.inviterName} ({inviteInfo.inviterEmail})
          </p>
          {inviteInfo.expired && (
            <p style={{ color: "red" }}>이 초대 링크는 만료되었습니다.</p>
          )}
        </>
      )}

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      {!inviteInfo?.expired && !errorMsg && (
        <button onClick={acceptInvite}>팀 가입하기</button>
      )}
    </div>
  );
};

export default TeamEntry;
