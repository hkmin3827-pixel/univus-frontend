import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../../context/TeamContext";
import AxiosApi from "../../api/AxiosApi";
import TeamApi from "../../api/TeamApi";
import "../../styles/LayOut.css";
import CreateBoardModal from "../board/CreateBoardModal";
import TeamSelect from "../team/TeamSelect";
import BoardApi from "../../api/BoardApi";

function SideBar({ isOpen, openProject, setOpenProject }) {
  const { selectedTeam } = useContext(TeamContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [myTeams, setMyTeams] = useState([]);
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const res = await TeamApi.getMyTeams();
      setMyTeams(res.data);
    } catch (err) {
      console.error("팀 목록 불러오기 실패:", err);
    }
  };

  const fetchBoards = async () => {
    if (!selectedTeam) {
      setBoards([]);
      return;
    }

    try {
      const res = await BoardApi.getBoardsByTeam(selectedTeam.id);
      setBoards(res.data);
    } catch (err) {
      console.error("게시판 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [selectedTeam]);

  return (
    <>
      <aside className={`sidebar ${isOpen ? "show" : ""}`}>
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

        <nav className="menu-list">
          <ul>
            <li
              className={`menu-item ${openProject ? "active" : ""}`}
              onClick={() => setOpenProject(!openProject)}
            >
              내 프로젝트
              <span className="material-symbols-outlined arrow">
                {openProject ? "expand_less" : "expand_more"}
              </span>
            </li>

            {openProject && (
              <ul className="project-board-list">
                {boards.length === 0 ? (
                  <li className="empty">새 게시판을 생성해주세요</li>
                ) : (
                  boards.map((b) => (
                    <li
                      key={b.id}
                      className={`board-item ${
                        selectedBoardId === b.id ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedBoardId(b.id);
                        navigate(`/team/${selectedTeam.id}/board/${b.id}`);
                      }}
                    >
                      {b.name}
                    </li>
                  ))
                )}
              </ul>
            )}

            <li onClick={() => navigate("/app/notice")}>공지사항</li>
            <li onClick={() => navigate("/app/insight")}>인사이트</li>
            <li onClick={() => navigate("/schedulepage")}>캘린더</li>
            <li onClick={() => navigate("/app/alert")}>알림</li>
          </ul>
        </nav>
      </aside>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teamId={selectedTeam?.id}
        onCreated={() => fetchBoards()}
      />
    </>
  );
}

export default SideBar;
