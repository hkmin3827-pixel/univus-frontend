// src/pages/TeamCreate.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";

const TeamCreate = () => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 🔥 createTeam(teamName, description) 으로 호출해야 함!
      const res = await TeamApi.createTeam(teamName, description);

      console.log("팀 생성 성공:", res.data);

      navigate(`/teams/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg("팀 생성에 실패했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>팀 생성</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>팀 이름</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div>
          <label>팀 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <button type="submit">생성하기</button>
      </form>
    </div>
  );
};

export default TeamCreate;
