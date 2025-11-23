import logo from "../../images/layoutLogo.png";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile"); // 페이지 이동
  };

  const goToHome = () => {
    navigate("/Home"); // 페이지 이동
  };

  return (
    <header className="topbar">
      <img
        className="logo"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
        src={logo}
        alt="univus 로고"
      />

      <div className="search-box">
        <input placeholder="검색어를 입력해주세요" />
      </div>

      <div className="top-icons">
        <span>🔔</span>
        <span>💬</span>

        {/* 정보 수정 페이지로 이동 */}
        <span onClick={goToProfile} style={{ cursor: "pointer" }}>
          👤
        </span>
      </div>
    </header>
  );
}

export default TopBar;
