// src/components/layout/TeamInviteLayout.js
import { Outlet } from "react-router-dom";

const TeamInviteLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Outlet />
    </div>
  );
};

export default TeamInviteLayout;
