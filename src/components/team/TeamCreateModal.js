import { useState, useContext } from "react";
import "../../styles/Modal.css";
import TeamApi from "../../api/TeamApi";

function TeamCreateModal({ isOpen, onClose }) {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const leaderId = localStorage.getItem("userId");

  if (!isOpen) return null;

  const submitCreateTeam = async () => {
    if (!teamName.trim()) return alert("팀 이름은 필수입니다.");

    try {
      await TeamApi.createTeam(teamName, description, Number(leaderId));
      alert("팀이 생성되었습니다! 🎉");
      onClose();
      setTeamName("");
      setDescription("");
    } catch (e) {
      console.error(e);
      const message =
        e.response?.data?.message ||
        e.response?.data ||
        "팀 생성에 실패하였습니다.";

      alert(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>팀 생성</h2>

        <label>팀 이름</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="예: 개발팀"
        />

        <label>설명 (선택)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="팀 설명 입력"
        />

        <div className="modal-actions">
          <button onClick={onClose}>취소</button>
          <button onClick={submitCreateTeam}>생성</button>
        </div>
      </div>
    </div>
  );
}

export default TeamCreateModal;
