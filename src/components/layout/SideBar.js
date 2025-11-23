import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";

function SideBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 호출 (세션 무효화)
      await AxiosApi.logout();
    } catch (error) {
      console.error("로그아웃 오류", error);
      // 서버 오류여도 로컬 로그아웃은 진행
    }

    // 로컬에 저장된 로그인 정보 삭제
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    // 필요하면 전부 삭제
    // localStorage.clear();

    // 로그인 페이지로 이동
    navigate("/");
  };

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

        {/* 🔥 Link 대신 onClick으로 로그아웃 처리 */}
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          로그아웃
        </span>
      </div>
    </aside>
  );
}

export default SideBar;
