// src/components/home/ScheduleModal.js
import React from "react";
import "../../styles/ScheduleModal.css";

function ScheduleModal({ event, onClose, onEdit, onDelete }) {
  const dateTime = event.start || event.dateTime || event.date;
  const formatted = dateTime ? new Date(dateTime).toLocaleString() : "-";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* 상단 헤더 */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-chip">일정</span>
            <h2 className="modal-title">📌 일정 상세보기</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="modal-body">
          <div className="modal-row">
            <span className="label">제목</span>
            <span className="value title">{event.title}</span>
          </div>

          <div className="modal-row">
            <span className="label">일시</span>
            <span className="value">{formatted}</span>
          </div>

          <div className="modal-row column">
            <span className="label">내용</span>
            <div className="value desc">
              {event.description && event.description.trim() !== ""
                ? event.description
                : "내용이 없습니다."}
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="modal-actions">
          <button className="btn danger" onClick={onDelete}>
            삭제
          </button>
          <button className="btn outline" onClick={onEdit}>
            수정
          </button>
          <button className="btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;
