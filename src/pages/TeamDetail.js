// src/pages/TeamDetail.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";

const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await TeamApi.getTeam(teamId);
        setTeam(res.data);
      } catch (err) {
        console.error(err);
        const msg = err.response?.data?.message;
        if (msg === "팀을 찾을 수 없습니다.") {
          setErrorMsg(msg);
          navigate("/home"); // 팀이 없으면 홈으로 돌려보냄
        } else if (msg === "권한이 없습니다.") {
          setErrorMsg("이 팀에 접근할 권한이 없습니다.");
          navigate("/home");
        } else {
          setErrorMsg("팀 정보를 불러오지 못했습니다.");
        }
      }
    };
    fetchTeam();
  }, [teamId]);

  const createInvite = async () => {
    setErrorMsg("");
    setInviteUrl("");
    try {
      const res = await TeamApi.createTeamInvite(teamId);
      console.log("초대 생성 응답:", res.data);
      setInviteUrl(res.data.inviteUrl);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        setErrorMsg("팀장만 초대 링크를 생성할 수 있습니다.");
      } else {
        setErrorMsg("초대 링크 생성에 실패했습니다.");
      }
    }
  };

  if (!team) return <div>로딩중...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>{team.teamName}</h2>
      <p>{team.description}</p>
      <p>
        팀장: {team.leaderName} ({team.leaderEmail})
      </p>
      <p>멤버 수: {team.memberCount}</p>

      <hr />

      <button onClick={createInvite}>초대 링크 생성</button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {inviteUrl && (
        <div>
          <p>초대 링크:</p>
          <input
            type="text"
            value={inviteUrl}
            readOnly
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default TeamDetail;
