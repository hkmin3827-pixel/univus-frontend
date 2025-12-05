import { Outlet } from "react-router-dom";
import useTeamGuard from "../hooks/useTeamGuard";

export default function TeamGuard() {
  useTeamGuard();
  return <Outlet />;
}
