import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import "../../styles/LayOut.css";

function Layout() {
  return (
    <div className="layout-container">
      <TopBar />
      <div className="content-wrapper">
        <SideBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
