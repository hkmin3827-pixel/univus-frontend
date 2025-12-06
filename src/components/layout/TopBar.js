import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { TeamContext } from "../../context/TeamContext";
import { UserContext } from "../../context/UserContext";
import logo from "../../images/layoutLogo.png";
import profileDefaultImg from "../../images/profileDefaultImg.png";

const TopBarContainer = styled.header`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  margin-top: 15px;
  padding-bottom: 15px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.img`
  height: 32px;
  cursor: pointer;
`;

const SearchBox = styled.div`
  width: 100%;
  max-width: 480px;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;

  @media (max-width: 940px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;

  &::placeholder {
    color: #9ca3af;
  }
`;

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

// 공통 아이콘
const Icon = styled.span.attrs({
  className: "material-symbols-outlined",
})`
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f3f4f6;
  }
`;

// 검색창 안 아이콘 (hover 효과 X)
const SearchIcon = styled(Icon)`
  color: #9ca3af;
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

// 모바일 전용 검색 아이콘
const MobileSearchIcon = styled(Icon)`
  display: none;

  @media (max-width: 940px) {
    display: inline-flex;
  }

  @media (min-width: 941px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f3f4f6;
  }

  @media (min-width: 941px) {
    display: none;
  }
`;

// 검색 오버레이
const SearchOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 80px 16px 16px;

  .search-overlay-inner {
    width: 100%;
    max-width: 480px;
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .search-overlay-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
  }

  .close-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 24px;
    padding: 4px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    background: #f3f4f6;
  }

  .search-overlay-body {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    padding: 8px 12px;
  }

  .search-overlay-body .search-icon {
    font-size: 20px;
    color: #9ca3af;
  }

  .search-overlay-body input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmed = searchKeyword.trim();
      if (trimmed.length === 0) return;
      if (!selectedTeam) {
        alert("팀을 먼저 선택해주세요.");
        return;
      }
      e.preventDefault();
      navigate(
        `/search?teamId=${selectedTeam.id}&keyword=${encodeURIComponent(
          trimmed
        )}`
      );
      setSearchKeyword("");
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <TopBarContainer>
        {/* 왼쪽: 로고 */}
        <LeftSection>
          <Logo src={logo} alt="univus 로고" onClick={handleClickLogo} />
        </LeftSection>

        {/* 가운데: 검색창 (데스크탑에서만 보임) */}
        <CenterSection>
          <SearchBox>
            <SearchIcon>search</SearchIcon>
            <SearchInput
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleSearch}
            />
          </SearchBox>
        </CenterSection>

        {/* 오른쪽: 아이콘들 */}
        <RightSection>
          {/* 모바일 전용 검색 아이콘 */}
          <MobileSearchIcon onClick={() => setIsSearchOpen(true)}>
            search
          </MobileSearchIcon>

          <Icon onClick={goToTeamInvite}>group_add</Icon>
          <Icon onClick={goToTeamEntry}>add_link</Icon>
          <Icon onClick={goToActivityLog}>inventory</Icon>

          <ProfileImg
            src={
              user.image && user.image.trim() !== ""
                ? user.image
                : profileDefaultImg
            }
            alt="프로필"
            onClick={goToProfile}
          />

          <MenuButton type="button" onClick={onMenuClick}>
            <Icon>{isOpen ? "close" : "menu"}</Icon>
          </MenuButton>
        </RightSection>
      </TopBarContainer>

      {/* 모바일 검색 오버레이 */}
      {isSearchOpen && (
        <SearchOverlay>
          <div className="search-overlay-inner">
            <div className="search-overlay-header">
              <button
                className="close-btn"
                type="button"
                onClick={() => setIsSearchOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="search-overlay-body">
              <span className="material-symbols-outlined search-icon">
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
            </div>
          </div>
        </SearchOverlay>
      )}
    </>
  );
}

export default TopBar;
