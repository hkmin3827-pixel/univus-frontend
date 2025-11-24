import { useState, useContext } from "react";
import TeamCreateModal from "../components/team/TeamCreateModal";
import { TeamContext } from "../context/TeamContext";

function TeamPage() {
  const { selectedTeam } = useContext(TeamContext);
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);

  return (
    <>
      <div className="team-actions">
        <button
          className="action-btn"
          onClick={() => setOpenCreateTeamModal(true)}
        >
          팀 생성
        </button>
      </div>

      <TeamCreateModal
        isOpen={openCreateTeamModal}
        onClose={() => setOpenCreateTeamModal(false)}
        onCreated={() => console.log("팀 생성 완료 → 필요하면 리스트 refresh")}
      />
    </>
  );
}

export default TeamPage;
