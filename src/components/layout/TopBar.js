import logo from "../../images/layoutLogo.png";
import { useState, useEffect } from "react";
// import { storage } from "../../firebase";
// import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState(null);

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
        <span id="icon-search" class="material-symbols-outlined">
          search
        </span>
        <input placeholder="검색어를 입력해주세요" />
      </div>

      <div className="top-icons">
        <span class="material-symbols-outlined">inventory</span>
        <span>💬</span>
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
            onClick={goToProfile}
          />
        ) : (
          <span class="material-symbols-outlined">account_circle</span>
        )}
      </div>
    </header>
  );
}

export default TopBar;
