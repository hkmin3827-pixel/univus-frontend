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

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: red;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 50%;
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

  const goToProfile = () => {
    navigate("/profiledetail");
  };

  const goToTeamInvite = () => {
    navigate("/teams/new");
  };

  const goToTeamEntry = () => {
    navigate("/team/entry");
  };

  const goToActivityLog = () => {
    if (!selectedTeam) return alert("팀을 먼저 선택해주세요.");
    // setActivityModalOpen((prev) => !prev);
    toggleActivity();
  };

  const handleClickLogo = () => {
    resetMenuState();
    closeSidebar();
    // const recentTeamId = localStorage.getItem("recentTeamId");

    if (selectedTeam && myTeams.length > 0) {
      if (selectedTeam) {
        setSelectedTeam(selectedTeam);
        setOpenProject(false);
        navigate(`/team/${selectedTeam.id}`);
        return;
      }
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
    }
  };

  return (
    <header className="topbar">
      <img
        className="logo"
        onClick={handleClickLogo}
        style={{ cursor: "pointer" }}
        src={logo}
        alt="univus 로고"
      />

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
        <span className="material-symbols-outlined" onClick={goToTeamInvite}>
          group_add
        </span>
        <span className="material-symbols-outlined" onClick={goToTeamEntry}>
          add_link
        </span>
        <span
          className="material-symbols-outlined activity-icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleActivity();
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
  );
}

export default TopBar;
