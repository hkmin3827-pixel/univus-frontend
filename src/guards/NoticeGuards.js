import { Outlet } from "react-router-dom";
import useNoticeGuard from "../hooks/useNoticeGuard";

export default function NoticeGuard() {
  useNoticeGuard();
  return <Outlet />;
}
