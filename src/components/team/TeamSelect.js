import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TeamSelect.css";

function TeamSelect({ myTeams, size = "default" }) {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("팀 선택");
  const navigate = useNavigate();

  const handleTeamSelect = (team) => {
    setSelectedTeam(team.name);
    setOpen(false);

    // 선택한 팀 id 기준 이동
    navigate(`/team/${team.id}`);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={() => setOpen(!open)}>
        <span className="button-label">{selectedTeam}</span>
        <span className="material-symbols-outlined arrow-icon">
          {open ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      </button>

      <div className={`dropdown-list ${open ? "open" : ""}`}>
        {myTeams.map((team) => (
          <div
            key={team.id}
            className="dropdown-item"
            onClick={() => handleTeamSelect(team)}
          >
            {team.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamSelect;
