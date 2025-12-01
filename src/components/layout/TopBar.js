import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { TeamContext } from "../../context/TeamContext";
import { UserContext } from "../../context/UserContext";
import logo from "../../images/layoutLogo.png";

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
`;

function TopBar({ onMenuClick, setOpenProject, resetMenuState }) {
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

  const handleClickLogo = () => {
    resetMenuState();
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
      if (trimmed === "") return;

      e.preventDefault();
      console.log("검색어:", trimmed);
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
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
        <span className="material-symbols-outlined">inventory</span>

        {user.image && user.image.trim() !== "" ? (
          <ProfileImg src={user.image} alt="프로필" onClick={goToProfile} />
        ) : (
          <span className="material-symbols-outlined" onClick={goToProfile}>
            account_circle
          </span>
        )}
      </div>

      <button className="menu-btn" onClick={onMenuClick}>
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}

export default TopBar;
