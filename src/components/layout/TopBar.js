import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TeamContext } from "../../context/TeamContext";
import { UserContext } from "../../context/UserContext";
import logo from "../../images/layoutLogo.png";
import profileDefaultImg from "../../images/profileDefaultImg.png";

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
`;

function TopBar({
  onMenuClick,
  setOpenProject,
  resetMenuState,
  isOpen,
  closeSidebar,
  toggleActivity,
}) {
  const navigate = useNavigate();
  const { myTeams, selectedTeam, setSelectedTeam } = useContext(TeamContext);
  const { user } = useContext(UserContext);

  // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState("");
  // 모바일 검색 오버레이 on/off 상태
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const goToProfile = () => {
    resetMenuState();
    setOpenProject(false);
    closeSidebar();

    navigate("/profiledetail");
  };

  const goToTeamInvite = () => {
    resetMenuState();
    setOpenProject(false);
    closeSidebar();
    navigate("/teams/new");
  };

  const goToTeamEntry = () => {
    resetMenuState();
    setOpenProject(false);
    closeSidebar();
    navigate("/team/entry");
  };

  const goToActivityLog = () => {
    if (!selectedTeam) return alert("팀을 먼저 선택해주세요.");

    toggleActivity();
  };

  const handleClickLogo = () => {
    resetMenuState();
    closeSidebar();

    if (selectedTeam && myTeams.length > 0) {
      setSelectedTeam(selectedTeam);
      setOpenProject(false);
      navigate(`/team/${selectedTeam.id}`);
      return;
    }

    if (myTeams.length > 0) {
      setSelectedTeam(myTeams[0]);
      localStorage.setItem("recentTeamId", myTeams[0].id);
      setOpenProject(false);
      navigate(`/team/${myTeams[0].id}`);
    } else {
      setSelectedTeam(null);
      setOpenProject(false);
      navigate("/home");
    }
  };

  // 모바일 검색 열기/닫기
  const openMobileSearch = () => setIsMobileSearchOpen(true);
  const closeMobileSearch = () => setIsMobileSearchOpen(false);

  // 검색 input 엔터 이벤트 핸들러
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = searchKeyword.trim();
      if (trimmed.length === 0) return;
      if (!selectedTeam) {
        alert("팀을 먼저 선택해주세요.");
        return;
      }
      e.preventDefault();
      console.log("검색어:", trimmed);
      navigate(
        `/search?teamId=${selectedTeam.id}&keyword=${encodeURIComponent(
          trimmed
        )}`
      );
      setSearchKeyword("");
      setIsMobileSearchOpen(false); // 모바일에서는 검색 후 오버레이 닫기
    }
  };

  return (
    <>
      <header className="topbar">
        <img
          className="logo"
          onClick={handleClickLogo}
          style={{ cursor: "pointer" }}
          src={logo}
          alt="univus 로고"
        />

        {/* PC용 중앙 검색창 (모바일에서는 CSS로 숨김) */}
        <div className="search-box">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="top-icons">
          {/* 모바일 전용 검색 버튼 (PC에서는 CSS로 display: none) */}
          <span
            onClick={openMobileSearch}
            className="material-symbols-outlined mobile-search-trigger"
          >
            search
          </span>

          <span className="material-symbols-outlined" onClick={goToTeamInvite}>
            group_add
          </span>
          <span className="material-symbols-outlined" onClick={goToTeamEntry}>
            add_link
          </span>
          <span
            className="material-symbols-outlined activity-icon-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToActivityLog();
            }}
          >
            inventory
          </span>

          <ProfileImg
            src={
              user.image && user.image.trim() !== ""
                ? user.image
                : profileDefaultImg
            }
            alt="프로필"
            onClick={goToProfile}
          />
        </div>

        <button className="menu-btn" onClick={onMenuClick}>
          <span className="material-symbols-outlined">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* 모바일 검색 오버레이 */}
      <div
        className={`mobile-search-overlay ${isMobileSearchOpen ? "show" : ""}`}
        onClick={closeMobileSearch}
      >
        <div
          className="mobile-search-container"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="material-symbols-outlined mobile-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleSearch}
            autoFocus
          />
          <span
            onClick={closeMobileSearch}
            className="material-symbols-outlined mobile-search-close"
          >
            close
          </span>
        </div>
      </div>
    </>
  );
}

export default React.memo(TopBar);
