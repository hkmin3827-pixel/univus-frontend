import { useState } from "react";
import "../../styles/Modal.css";
import TeamApi from "../../api/TeamApi";
import { useNavigate } from "react-router-dom";
import BoardApi from "../../api/BoardApi";

function CreateBoardModal({ isOpen, onClose, teamId, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("게시판 이름은 필수입니다.");
      return;
    }

    if (!teamId) {
      alert("팀이 선택되지 않았습니다.");
      return;
    }

    try {
      const res = await BoardApi.createBoard(teamId, name, description);
      console.log("게시판 생성 성공:", res.data);

      alert("게시판이 생성되었습니다.");

      if (onCreated) onCreated(); // 안전하게 호출
      onClose();

      setName("");
      setDescription("");
    } catch (e) {
      if (e.response?.data?.message?.includes("이미 존재")) {
        alert("게시판 생성 실패. 같은 이름의 게시판이 이미 존재합니다.");
      } else {
        alert("생성 실패: 서버 오류");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>새 프로젝트 만들기</h2>

        <label>프로젝트 이름</label>
        <input
          type="text"
          placeholder="예: univus prj react"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>설명 (선택)</label>
        <textarea
          placeholder="게시판 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            취소
          </button>
          <button onClick={handleSubmit} className="create-btn">
            생성
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBoardModal;
