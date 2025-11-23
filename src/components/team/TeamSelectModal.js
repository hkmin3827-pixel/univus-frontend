// src/components/team/TeamSelectModal.jsx
import { useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";

const TeamSelectModal = ({ isOpen, onClose, onSelectTeam }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchTeams = async () => {
      try {
        const res = await AxiosApi.getMyTeams();
        setTeams(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTeams();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="team-modal-backdrop" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <h2>팀 선택</h2>
        <ul className="team-list">
          {teams.map((team) => (
            <li
              key={team.teamId}
              className="team-item"
              onClick={() => onSelectTeam(team)}
            >
              <div className="team-name">{team.teamName}</div>
              <div className="team-sub">
                코드: {team.teamCode} / 역할: {team.role}
              </div>
            </li>
          ))}
        </ul>
        <button className="team-modal-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default TeamSelectModal;
