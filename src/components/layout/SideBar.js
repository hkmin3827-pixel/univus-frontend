import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TeamContext } from "../../context/TeamContext";
import AxiosApi from "../../api/AxiosApi";
import TeamApi from "../../api/TeamApi";
import "../../styles/LayOut.css";
import CreateBoardModal from "../board/CreateBoardModal";
import TeamSelect from "../team/TeamSelect";
import BoardApi from "../../api/BoardApi";
import InviteModal from "../team/InviteModal";
import MiniTodoList from "../todo/MiniTodoList";
import { useTodo } from "../../context/TodoContext";

function SideBar({
  isOpen,
  openProject,
  setOpenProject,
  resetMenuState,
  selectedMenu,
  setSelectedMenu,
  selectedBoardId,
  setSelectedBoardId,
}) {
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [inviteLink, setInviteLink] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const { teamId } = useParams(); // URL에서 팀 ID 가져오기
  const { resetTodos } = useTodo();

  /** 🔹 팀 목록 불러오기 */
  const fetchTeams = async () => {
    try {
      const res = await TeamApi.getMyTeams();
      setMyTeams(res.data);
    } catch (err) {
      console.error("팀 목록 불러오기 실패:", err);
    }
  };

  /** 🔹 선택된 팀의 게시판 목록 불러오기 */
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

  /** 🔹 로그아웃 */
  const handleLogout = async () => {
    try {
      localStorage.clear();
      resetTodos();
      setSelectedTeam(null);
      setMyTeams([]);
      await AxiosApi.logout();
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      localStorage.clear();
      setSelectedTeam(null);
      setMyTeams([]);
      navigate("/");
    }
  };

  /** 🔹 초대 링크 생성 */
  const openInviteModal = async () => {
    if (!selectedTeam) {
      alert("팀을 선택해주세요.");
      return;
    }
    try {
      const res = await TeamApi.createTeamInvite(selectedTeam.id);
      setInviteLink(res.data.inviteUrl);
      setModalOpen(true);
    } catch (err) {
      console.error("초대 링크 생성 실패 : ", err);
      alert("팀 선택이 되지 않았거나 발급 권한이 없습니다.");
    }
  };

  /** 🔥 인사이트 클릭 */
  const handleInsightClick = () => {
    if (!selectedBoardId) {
      alert("먼저 게시판을 선택해주세요.");
      return;
    }
    const selectedBoard = boards.find((b) => b.id === selectedBoardId);
    setSelectedMenu("insight");
    setOpenProject(false);
    navigate(`/team/${teamId}/boards/${selectedBoardId}/insight`, {
      state: { boardName: selectedBoard?.name },
    });
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "show" : ""}`}>
        {" "}
        <div className="sidebar-top-group">
          {" "}
          <div className="team-select-row">
            {selectedTeam && (
              <span
                className="material-symbols-outlined info-btn"
                onClick={() => navigate(`/team/${selectedTeam.id}/info`)}
              >
                info{" "}
              </span>
            )}{" "}
            <TeamSelect myTeams={myTeams} size="sidebar" />{" "}
          </div>
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
            {selectedTeam && teamId ? (
              <>
                {/* 내 프로젝트 */}
                <li
                  className={`menu-item ${
                    "project" && openProject ? "active" : ""
                  }`}
                  onClick={() => {
                    if (openProject) {
                      setSelectedMenu(null);
                      setOpenProject(false);
                    } else {
                      setSelectedMenu("project");
                      setOpenProject(true);
                    }
                  }}
                >
                  내 프로젝트
                  <span className="material-symbols-outlined arrow">
                    {openProject ? "expand_less" : "expand_more"}
                  </span>
                </li>

                {openProject && (
                  <ul className="project-board-list">
                    {boards.length === 0 ? (
                      <li className="empty">새 프로젝트를 생성해주세요</li>
                    ) : (
                      boards.map((b) => (
                        <li
                          key={b.id}
                          className={`board-item ${
                            selectedBoardId === b.id ? "active" : ""
                          }`}
                          onClick={() => {
                            setSelectedBoardId(b.id);
                            navigate(`/team/${teamId}/board/${b.id}`);
                          }}
                        >
                          {b.name}
                        </li>
                      ))
                    )}
                  </ul>
                )}

                {/* 인사이트 */}
                <li
                  className={`menu-item ${
                    selectedMenu === "insight" && !openProject ? "active" : ""
                  }`}
                  onClick={handleInsightClick}
                >
                  인사이트
                </li>

                {/* 공지사항 */}
                <li
                  className={`menu-item ${
                    selectedMenu === "notice" && !openProject ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedMenu("notice");
                    setOpenProject(false);
                    setSelectedBoardId(null);
                    navigate(`team/${teamId}/notice`);
                  }}
                >
                  공지사항
                </li>
              </>
            ) : (
              <li className="empty">팀을 선택해주세요</li>
            )}

            {/* 캘린더는 항상 노출 */}
            <li
              className={`menu-item ${
                selectedMenu === "calendar" && !openProject ? "active" : ""
              }`}
              onClick={() => {
                setSelectedMenu("calendar");
                setOpenProject(false);
                setSelectedBoardId(null);
                navigate("/schedulepage");
              }}
            >
              캘린더
            </li>
          </ul>
        </nav>
        {selectedBoardId && <MiniTodoList selectedBoardId={selectedBoardId} />}
        <div className="bottom-menu">
          <ul>
            <li className="invite-link-btn" onClick={openInviteModal}>
              <span className="material-symbols-outlined">link</span>팀 초대
              링크 발급
            </li>

            <li id="zoom">
              <a
                href="https://zoom.us/ko/join"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">
                  captive_portal
                </span>
                ZOOM으로 이동
              </a>
            </li>

            <li onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>
              로그아웃
            </li>
          </ul>
        </div>
      </aside>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teamId={selectedTeam?.id}
        onCreated={() => fetchBoards()}
      />

      <InviteModal
        link={inviteLink}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default SideBar;
