import React from "react";
import "../../styles/ScheduleModal.css";

function ScheduleModal({ event, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>📌 일정 상세보기</h2>

        <p>
          <strong>제목:</strong> {event.title}
        </p>
        <p>
          <strong>일시:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>내용:</strong>
        </p>
        <div className="desc">{event.description}</div>

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ScheduleModal;
