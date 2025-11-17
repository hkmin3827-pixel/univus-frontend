import logo from "../../images/layoutLogo.png";

function TopBar() {
  return (
    <header className="topbar">
      <img className="logo" src={logo} alt="univus 로고" />
      <div className="search-box">
        <input placeholder="검색어를 입력해주세요" />
      </div>
      <div className="top-icons">
        <span>🔔</span>
        <span>💬</span>
        <span>👤</span>
      </div>
    </header>
  );
}

export default TopBar;
