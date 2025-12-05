import { Outlet } from "react-router-dom";
import useBoardGuard from "../hooks/useBoardGuard";

export default function BoardGuard() {
  useBoardGuard();
  return <Outlet />;
}
