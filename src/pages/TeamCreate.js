// src/pages/TeamCreate.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import InviteModal from "../components/team/InviteModal";
import "../styles/TeamCreate.css";
import { TeamContext } from "../context/TeamContext";

const TeamCreate = () => {
  const { fetchTeams, setSelectedTeam } = useContext(TeamContext);

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [createdTeamId, setCreatedTeamId] = useState(null);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState(null);

  const leaderId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await TeamApi.createTeam(teamName, description, leaderId);
      const newTeam = res.data;
      alert("팀이 생성되었습니다!");

      await fetchTeams(); // 팀 목록 즉시 갱신
      setSelectedTeam(newTeam);
      localStorage.setItem("selectedTeamId", newTeam.id);
      setCreatedTeamId(newTeam.id);
      // navigate(`/team/${newTeam.id}`); // 페이지 이동
    } catch (err) {
      console.error(err);

      const backendMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "팀 생성에 실패했습니다.";

      setErrorMsg(backendMsg);
      setCreatedTeamId(null);
    }
  };

  const handleInviteClick = async () => {
    if (!createdTeamId) return;

    try {
      const res = await TeamApi.createTeamInvite(createdTeamId);
      setInviteLink(res.data.inviteUrl);
      setInviteModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("초대 링크 생성 실패");
    }
  };

  return (
    <div className="team-create-container">
      <h2 className="team-title">팀 생성</h2>

      <form onSubmit={onSubmit} className="team-form">
        <div className="form-control">
          <label>팀 이름</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="예: 개발팀"
          />
        </div>

        <div className="form-control">
          <label>팀 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="팀 설명 입력"
          />
        </div>

        <p className="error-text">{errorMsg}</p>

        <button type="submit" className="primary-btn">
          팀 생성하기
        </button>
      </form>

      <button
        className={`secondary-btn ${!createdTeamId ? "disabled" : ""}`}
        disabled={!createdTeamId}
        onClick={handleInviteClick}
      >
        초대 링크 발급
      </button>

      <InviteModal
        link={inviteLink}
        onClose={() => setInviteModalOpen(false)}
        isOpen={inviteModalOpen}
      />
    </div>
  );
};

export default TeamCreate;
