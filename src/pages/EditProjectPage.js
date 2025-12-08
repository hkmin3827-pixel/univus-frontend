import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeamApi from "../api/TeamApi";
import "../styles/EditProjectPage.css";
import BoardApi from "../api/BoardApi";

function EditProjectPage() {
  const { teamId, boardId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await BoardApi.getBoardDetail(teamId, boardId);
        setName(res.data.name);
        setDescription(res.data.description);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [teamId, boardId]);

  const handleSave = async () => {
    try {
      await BoardApi.modifyBoard(teamId, boardId, { name, description });
      alert("프로젝트 정보가 수정되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "정말 프로젝트를 삭제하시겠습니까? 해당 프로젝트의 모든 리포트와 피드백이 삭제됩니다."
      )
    )
      return;
    try {
      await BoardApi.deleteBoard(teamId, boardId);
      alert("프로젝트가 삭제되었습니다.");
      navigate(`/team/${teamId}`);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  return (
    <div className="edit-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <h2>프로젝트 정보 수정</h2>

      <label> 이름</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>설명</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="save-btn" onClick={handleSave}>
        저장하기
      </button>

      <span className="project-delete" onClick={handleDelete}>
        프로젝트 삭제하기
      </span>
    </div>
  );
}

export default EditProjectPage;
