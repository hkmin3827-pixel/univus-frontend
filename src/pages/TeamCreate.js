// src/pages/TeamCreate.jsx
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import InviteModal from "../components/team/InviteModal";
import "../styles/TeamCreate.css";
import { TeamContext } from "../context/TeamContext";
import { useSearchParams } from "react-router-dom";

const TeamCreate = () => {
  const { fetchTeams, setSelectedTeam } = useContext(TeamContext);
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");

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
      navigate(`/teams/new?teamId=${newTeam.id}`);
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

  useEffect(() => {
    const loadTeam = async () => {
      if (teamId) {
        try {
          const res = await TeamApi.getTeam(teamId); // 팀 조회 API
          setSelectedTeam(res.data); // 전체 team 객체 저장
          localStorage.setItem("selectedTeamId", teamId);
        } catch (err) {
          console.error("팀 정보 로딩 실패:", err);
        }
      }
    };

    loadTeam();
  }, [teamId]);

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
        <button
          type="button"
          className={`secondary-btn ${!createdTeamId ? "disabled" : ""}`}
          disabled={!createdTeamId}
          onClick={handleInviteClick}
        >
          초대 링크 발급
        </button>
      </form>

      <InviteModal
        link={inviteLink}
        onClose={() => setInviteModalOpen(false)}
        isOpen={inviteModalOpen}
      />
    </div>
  );
};

export default TeamCreate;
