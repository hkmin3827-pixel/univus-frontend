import { useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import "../../styles/Modal.css";

function CreateBoardModal({ isOpen, onClose, teamId, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("게시판 이름은 필수입니다.");
      return;
    }

    try {
      await AxiosApi.createBoard(teamId, name, description);
      alert("게시판이 생성되었습니다.");
      onCreated(); // ⭐ 목록 새로고침 트리거
      onClose();
      setName("");
      setDescription("");
    } catch (e) {
      alert("생성 실패: 서버 오류");
      console.error(e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>새 프로젝트 만들기</h2>

        <label>프로젝트 이름</label>
        <input
          type="text"
          placeholder="예: 공지사항"
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
