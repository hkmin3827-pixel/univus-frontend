import logo from "../../images/layoutLogo.png";
import { useState, useEffect } from "react";
// import { storage } from "../../firebase";
// import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function TopBar({ onMenuClick }) {
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState(null);

  const goToProfile = () => {
    navigate("/profiledetail"); // 페이지 이동
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
        <span className="material-symbols-outlined search-icon">search</span>
        <input placeholder="검색어를 입력해주세요" />
      </div>

      <div className="top-icons">
        <span class="material-symbols-outlined">group_add</span>
        <span class="material-symbols-outlined">inventory</span>
        {/* 프로필 이미지 */}
        {profileUrl ? (
          <img
            src={profileUrl}
            alt="프로필"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        ) : (
          <span class="material-symbols-outlined" onClick={goToProfile}>
            account_circle
          </span>
        )}
      </div>
      {/* 모바일 전용 햄버거 */}
      <button className="menu-btn" onClick={onMenuClick}>
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}

export default TopBar;
