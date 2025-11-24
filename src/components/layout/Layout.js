import { useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "../../styles/LayOut.css";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="layout-container">
        <TopBar onMenuClick={toggleSidebar} />

        <div className="content-wrapper">
          {/* isOpen 전달 필수 */}
          <SideBar isOpen={isSidebarOpen} />

          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 모바일에서만 overlay 표시 */}
      {isSidebarOpen && window.innerWidth < 992 && (
        <div className="overlay" onClick={closeSidebar} />
      )}
    </>
  );
}

export default Layout;
