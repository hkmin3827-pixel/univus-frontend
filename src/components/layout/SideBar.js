import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../../context/TeamContext";
import TeamSelectModal from "../team/TeamSelectModal";
import AxiosApi from "../../api/AxiosApi";
import "../../styles/LayOut.css";
import CreateBoardModal from "../board/CreateBoardModal";
import TeamSelect from "../team/TeamSelect";

function SideBar({ isOpen }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedTeam) return setBoards([]);

    const fetchBoards = async () => {
      try {
        const res = await AxiosApi.getBoardsByTeam(selectedTeam.teamId);
        setBoards(res.data);
      } catch (err) {
        console.error("게시판 불러오기 실패:", err);
      }
    };

    fetchBoards();
  }, [selectedTeam]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setIsTeamModalOpen(false);
    setOpenProject(true);
  };

  const handleLogout = async () => {
    try {
      await AxiosApi.logout(); // 백엔드 로그아웃 호출 (세션 무효화)

      // 프론트 상태 정리
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      // // 그래도 로컬은 비우고 보내고 싶으면:
      localStorage.clear();
      navigate("/");
    }
  };

  const myTeams = [
    { id: 1, name: "UI/UX 팀" },
    { id: 2, name: "백엔드 팀" },
    { id: 3, name: "프론트엔드 팀" },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? "show" : ""}`}>
        {/* 버튼 그룹 */}
        <div className="sidebar-top-group">
          <TeamSelect myTeams={myTeams} size="sidebar" />

          <button
            className="new-project-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            새 프로젝트
            <span className="material-symbols-outlined add">add</span>
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <nav className="menu-list">
          <ul>
            {/* 내 프로젝트 (토글) */}
            <li
              className={`menu-item ${openProject ? "active" : ""}`}
              onClick={() => setOpenProject(!openProject)}
            >
              내 프로젝트
              <span className="material-symbols-outlined arrow">
                {openProject ? "expand_less" : "expand_more"}
              </span>
            </li>

            {/* 토글 목록 */}
            {openProject && (
              <ul className="project-board-list">
                {boards.length === 0 ? (
                  <li className="empty">+ 새 게시판을 생성해주세요</li>
                ) : (
                  boards.map((b) => (
                    <li key={b.id} className="board-item">
                      {b.name}
                    </li>
                  ))
                )}
              </ul>
            )}

            {/* 기본 메뉴 */}
            <li onClick={() => navigate("/app/notice")}>공지사항</li>
            <li onClick={() => navigate("/app/insight")}>인사이트</li>
            <li onClick={() => navigate("/schedulepage")}>캘린더</li>
            <li onClick={() => navigate("/app/alert")}>알림</li>
          </ul>
        </nav>

        {/* 줌으로 이동, 로그아웃 */}
        <div className="bottom-menu">
          <ul>
            <li id="zoom">
              <a
                href="https://zoom.us/ko/join"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="material-symbols-outlined">captive_portal</span>
                ZOOM으로 이동
              </a>
            </li>
            <li onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>로그아웃
            </li>
          </ul>
        </div>
      </aside>
      {/* 모달 */}
      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teamId={selectedTeam?.teamId}
      />
      {/* <TeamSelectModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSelectTeam={handleTeamSelect}
      />{" "} */}
    </>
  );
}

export default SideBar;
