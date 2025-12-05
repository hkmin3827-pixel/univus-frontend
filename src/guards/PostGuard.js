import { Outlet } from "react-router-dom";
import usePostGuard from "../hooks/usePostGuard";

export default function PostGuard() {
  usePostGuard();
  return <Outlet />;
}
