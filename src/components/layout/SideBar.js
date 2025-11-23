import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../../context/TeamContext";
import TeamSelectModal from "../team/TeamSelectModal";
import AxiosApi from "../../api/AxiosApi";
import "../../styles/LayOut.css";
import CreateBoardModal from "../board/CreateBoardModal";

function SideBar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [boards, setBoards] = useState([]);

  /** 🔹 팀 선택 후 게시판 가져오기 */
  useEffect(() => {
    if (!selectedTeam) {
      setBoards([]);
      return;
    }

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

  /** 🔹 팀 선택 시 동작 */
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setIsTeamModalOpen(false);
    setIsProjectOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Sidebar 영역 */}
      <aside className="sidebar">
        <button
          className="team-select-btn"
          onClick={() => setIsTeamModalOpen(true)}
        >
          팀 선택
        </button>

        <button
          className="new-project-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          새 프로젝트
        </button>

        <button
          className={`sidebar-toggle-btn ${isProjectOpen ? "active" : ""}`}
          onClick={() => setIsProjectOpen(!isProjectOpen)}
        >
          내 프로젝트 {selectedTeam ? `(${selectedTeam.teamName})` : ""}
        </button>

        {isProjectOpen && (
          <ul className="project-board-list">
            {boards.length > 0
              ? boards.map((board) => (
                  <li
                    key={board.id}
                    className="sidebar-subitem"
                    onClick={() =>
                      navigate(
                        `/app/team/${selectedTeam?.teamId}/board/${board.id}`
                      )
                    }
                  >
                    {board.name}
                  </li>
                ))
              : selectedTeam && (
                  <li className="sidebar-subitem" style={{ color: "#999" }}>
                    + 새 게시판을 생성해주세요
                  </li>
                )}
          </ul>
        )}
        {/* 🔽 선택된 팀 게시판 리스트 */}
        {isProjectOpen && selectedTeam && (
          <ul className="project-board-list">
            {boards.map((board) => (
              <li
                key={board.id}
                className="sidebar-item"
                onClick={() =>
                  navigate(`/app/team/${selectedTeam.teamId}/board/${board.id}`)
                }
              >
                {board.name}
              </li>
            ))}
          </ul>
        )}

        {isProjectOpen && selectedTeam && (
          <ul style={{ marginTop: "10px", paddingLeft: 0 }}>
            {boards.map((board) => (
              <li
                key={board.id}
                className="sidebar-item"
                onClick={() =>
                  navigate(`/app/team/${selectedTeam.teamId}/board/${board.id}`)
                }
              >
                {board.name}
              </li>
            ))}
          </ul>
        )}

        <nav className="menu-list">
          <ul>
            <li onClick={() => navigate("/app/dashboard")}>대시보드</li>
            <li onClick={() => navigate("/app/notice")}>공지사항</li>
            <li onClick={() => navigate("/app/messages")}>쪽지함</li>
            <li onClick={() => navigate("/app/alert")}>알림</li>
          </ul>
        </nav>

        <div className="bottom-menu" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span> 로그아웃
        </div>
      </aside>

      {/* 모달들 */}
      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teamId={selectedTeam?.teamId}
        onCreated={() => setBoards((prev) => [...prev])}
      />

      <TeamSelectModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSelectTeam={handleTeamSelect}
      />
    </>
  );
}

export default SideBar;
