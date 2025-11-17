import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className="sidebar">
      <button className="new-project-btn">새 프로젝트</button>

      <nav className="menu-list">
        <ul>
          <li>
            <Link to="/projects">내 프로젝트</Link>
          </li>
          <li>
            <Link to="/dashboard">대시보드</Link>
          </li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
          <li>
            <Link to="/messages">쪽지함</Link>
          </li>
          <li>
            <Link to="/alerts">알림</Link>
          </li>
        </ul>
      </nav>

      <div className="bottom-menu">
        <Link to="/settings">환경설정</Link>
        <Link to="/logout">로그아웃</Link>
      </div>
    </aside>
  );
}

export default SideBar;
