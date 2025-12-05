import useTeamGuard from "../hooks/useTeamGuard";

const TeamGuard = ({ children }) => {
  useTeamGuard();
  return children;
};

export default TeamGuard;
