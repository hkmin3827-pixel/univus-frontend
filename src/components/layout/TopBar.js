import logo from "../../images/layoutLogo.png";
<<<<<<< HEAD
import { useState, useEffect } from "react";
// import { storage } from "../../firebase";
// import { ref, getDownloadURL } from "firebase/storage";

function TopBar() {
  const [profileUrl, setProfileUrl] = useState(null);

  // useEffect(() => {
  // 실제 사용자 ID 또는 이미지 파일명을 사용해야 함
  // const imageRef = ref(storage, "profiles/user1.jpg");

  //   getDownloadURL(imageRef)
  //     .then((url) => {
  //       setProfileUrl(url);
  //     })
  //     .catch(() => {
  //       console.error("Firebase 이미지 로드 실패");
  //     });
  // }, []);
=======
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile"); // 페이지 이동
  };

  const goToHome = () => {
    navigate("/Home"); // 페이지 이동
  };

>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
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
<<<<<<< HEAD
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
          <span class="material-symbols-outlined">account_circle</span>
        )}
=======

        {/* 정보 수정 페이지로 이동 */}
        <span onClick={goToProfile} style={{ cursor: "pointer" }}>
          👤
        </span>
>>>>>>> 501c3610a796c4669db0cd3b6926c3a782c0ff6c
      </div>
    </header>
  );
}

export default TopBar;
