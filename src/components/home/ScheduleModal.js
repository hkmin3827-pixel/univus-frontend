// src/components/schedule/ScheduleCreateModal.js
import React, { useEffect, useState } from "react";
import "../../styles/ScheduleModal.css"; // 기존 모달 CSS 재사용

function ScheduleModal({ onClose, onSubmit, defaultDate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate || "");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (defaultDate) setDate(defaultDate);
  }, [defaultDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("제목, 날짜, 시간을 모두 입력해 주세요.");
      return;
    }
    onSubmit({ title, date, time, description });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>📝 일정 추가</h2>

        <form className="schedule-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              제목
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="일정 제목을 입력하세요."
              />
            </label>
          </div>

          <div className="form-row form-row-inline">
            <label>
              날짜
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              시간
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              내용
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="추가 메모를 입력해 주세요."
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="primary">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleModal;
