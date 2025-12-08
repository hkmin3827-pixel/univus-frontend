import { useState, useEffect, useCallback } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "../../styles/LayOut.css";
import { Outlet } from "react-router-dom";
import ActivityDropdown from "../activityLogModal/ActivityDropdown";
import { useActivityLog } from "../../context/ActivityLogContext";
import { NotificationProvider } from "../../context/NotificationContext";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const { activities } = useActivityLog();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    if (!isSidebarOpen) {
      setSelectedMenu("");
      resetMenuState();
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    resetMenuState();
  };
  const resetMenuState = () => {
    setSelectedMenu("");
    setOpenProject(false);
    setSelectedBoardId(null);
  };
  const toggleActivity = useCallback(() => {
    setActivityModalOpen((prev) => !prev);
  }, []);
  console.log("activityModalOpen:", activityModalOpen);
  return (
    <>
      <NotificationProvider>
        <div className="layout-container">
          <TopBar
            onMenuClick={toggleSidebar}
            setOpenProject={setOpenProject}
            resetMenuState={resetMenuState}
            isOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
            toggleActivity={toggleActivity}
          />

          {activityModalOpen && (
            <ActivityDropdown onClose={() => setActivityModalOpen(false)} />
          )}

          <div className="content-wrapper">
            <SideBar
              isOpen={isSidebarOpen}
              openProject={openProject}
              setOpenProject={setOpenProject}
              resetMenuState={resetMenuState}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              selectedBoardId={selectedBoardId}
              setSelectedBoardId={setSelectedBoardId}
            />

            <main className="main-content">
              <Outlet />
            </main>
          </div>
        </div>

        {isSidebarOpen && window.innerWidth < 992 && (
          <div className="overlay" onClick={closeSidebar} />
        )}
      </NotificationProvider>
    </>
  );
}

export default Layout;
