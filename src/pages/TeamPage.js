import { useState, useContext } from "react";
import TeamCreateModal from "../components/team/TeamCreateModal";
import { TeamContext } from "../context/TeamContext";

function TeamPage() {
  const { selectedTeam } = useContext(TeamContext);
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);

  return <></>;
}

export default TeamPage;
