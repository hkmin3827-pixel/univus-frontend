import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/TeamSelect.css";
import { TeamContext } from "../../context/TeamContext";

function TeamSelect({ size = "default" }) {
  const [open, setOpen] = useState(false);

  const { selectedTeam, setSelectedTeam, myTeams, fetchTeams } =
    useContext(TeamContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTeams();
    setOpen(false); // 페이지 이동 시 드롭다운 닫기
  }, [location.pathname]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team); // Context에 선택값 저장
    setOpen(false);
    navigate(`/team/${team.id}`);
  };

  return (
    <div className="dropdown-container">
      <button
        className={`dropdown-button ${selectedTeam ? "selected" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className="button-label">
          {selectedTeam ? selectedTeam.teamName : "팀 선택"}
        </span>
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
            {team.teamName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamSelect;
