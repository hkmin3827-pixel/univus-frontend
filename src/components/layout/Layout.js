import { useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "../../styles/LayOut.css";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const resetMenuState = () => {
    setSelectedMenu("");
    setOpenProject(false);
    setSelectedBoardId(null);
  };
  return (
    <>
      <div className="layout-container">
        <TopBar
          onMenuClick={toggleSidebar}
          setOpenProject={setOpenProject}
          resetMenuState={resetMenuState}
        />

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
    </>
  );
}

export default Layout;
