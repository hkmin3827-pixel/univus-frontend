// src/components/layout/TeamInviteLayout.js
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar"; // 팀 초대 전용 사이드바
import "../../styles/Layout.css";

const TeamInviteLayout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default TeamInviteLayout;
