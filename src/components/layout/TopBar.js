import logo from "../../images/layoutLogo.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../../context/TeamContext";
import { UserContext } from "../../context/UserContext";
import styled from "styled-components";
const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.6; /* 불투명 효과 */
  }
`;
function TopBar({ onMenuClick, setOpenProject }) {
  const navigate = useNavigate();
  const { myTeams, setSelectedTeam } = useContext(TeamContext);
  const { user } = useContext(UserContext);

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
    const recentTeamId = localStorage.getItem("recentTeamId");

    // 최근 선택된 팀 존재
    if (recentTeamId && myTeams.length > 0) {
      const recentTeam = myTeams.find((t) => t.id === Number(recentTeamId));
      if (recentTeam) {
        setSelectedTeam(recentTeam);
        setOpenProject(false); // 사이드바 닫기
        navigate(`/team/${recentTeam.id}`);
        return;
      }
    }

    // 팀이 1개 이상이면 첫 번째 팀으로
    if (myTeams.length > 0) {
      setSelectedTeam(myTeams[0]);
      localStorage.setItem("recentTeamId", myTeams[0].id);
      setOpenProject(false);
      navigate(`/team/${myTeams[0].id}`);
    } else {
      // 팀이 없는 경우
      setSelectedTeam(null);
      setOpenProject(false);
      navigate("/home");
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
        <input placeholder="검색어를 입력해주세요" />
      </div>

      <div className="top-icons">
        <span className="material-symbols-outlined" onClick={goToTeamInvite}>
          group_add
        </span>
        <span className="material-symbols-outlined" onClick={goToTeamEntry}>
          add_link
        </span>
        <span className="material-symbols-outlined">inventory</span>

        {/* 프로필 이미지 */}
        {user.image && user.image.trim() !== "" ? (
          <ProfileImg src={user.image} alt="프로필" onClick={goToProfile} />
        ) : (
          <span className="material-symbols-outlined" onClick={goToProfile}>
            account_circle
          </span>
        )}
      </div>

      {/* 모바일 메뉴 버튼 */}
      <button className="menu-btn" onClick={onMenuClick}>
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}

export default TopBar;
