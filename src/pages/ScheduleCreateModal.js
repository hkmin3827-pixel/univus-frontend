// src/components/schedule/ScheduleCreateModal.js
import React, { useEffect, useState } from "react";
import "../styles/ScheduleModal.css";

function ScheduleCreateModal({
  mode = "create",
  initialData,
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  useEffect(() => {
    if (!initialData) return;
    setTitle(initialData.title || "");
    setDate(initialData.date || "");
    setTime(initialData.time || "");
    setDescription(initialData.description || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("제목, 날짜, 시간을 모두 입력해 주세요.");
      return;
    }
    onSubmit({
      id: initialData?.id, // 수정일 때만 값 있음
      title,
      date,
      time,
      description,
    });
  };

  const isEdit = mode === "edit";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "📝 일정 수정" : "📝 일정 추가"}</h2>

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
            <button type="button" className="btn-cancel" onClick={onClose}>
              취소
            </button>

            <button type="submit" className="btn-submit">
              {mode === "edit" ? "수정 완료" : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleCreateModal;
