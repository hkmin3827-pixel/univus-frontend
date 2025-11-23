import logo from "../../images/layoutLogo.png";
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
  return (
    <header className="topbar">
      <img className="logo" src={logo} alt="univus 로고" />
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
          />
        ) : (
          <span class="material-symbols-outlined">account_circle</span>
        )}
      </div>
    </header>
  );
}

export default TopBar;
