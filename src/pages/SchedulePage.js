// src/pages/SchedulePage.js
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSearchParams } from "react-router-dom";
import ScheduleApi from "../api/ScheduleApi";
import "../styles/SchedulePage.css";

import ScheduleCreateModal from "./ScheduleCreateModal";
import ScheduleModal from "../components/home/ScheduleModal";

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [searchParams] = useSearchParams();
  const calendarRef = useRef(null);

  // 생성/수정 폼 모달
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create"); // "create" | "edit"
  const [formInitial, setFormInitial] = useState(null); // {id,title,date,time,description}

  // 상세보기 모달
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // {id,title,dateTime,description}

  // 일정 목록 불러오기
  const loadEvents = async () => {
    try {
      const res = await ScheduleApi.getAllSchedules();
      const mapped = res.data.map((e) => ({
        id: e.id,
        title: e.title,
        start: e.dateTime, // "2025-11-29T14:00"
        description: e.description,
      }));
      setEvents(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // ➕ 헤더의 "일정 추가 +" 버튼 클릭 (오늘 날짜 기본값)
  const handlePlusClick = () => {
    const today = new Date().toISOString().slice(0, 10); // yyyy-MM-dd
    setFormMode("create");
    setFormInitial({ date: today });
    setIsFormOpen(true);
  };

  // 📅 날짜 칸 클릭 → 해당 날짜를 기본값으로 폼 모달 열기
  const handleDateClick = (info) => {
    const onlyDate = info.dateStr.slice(0, 10); // yyyy-MM-dd
    setFormMode("create");
    setFormInitial({ date: onlyDate });
    setIsFormOpen(true);
  };

  // 📝 폼 모달에서 "저장" 클릭 (생성 / 수정 둘 다 처리)
  const handleFormSubmit = async (formData) => {
    const { id, title, date, time, description } = formData;
    const dateTime = `${date}T${time}`; // 예: 2025-11-30T14:00

    try {
      if (formMode === "create") {
        await ScheduleApi.createSchedule({ title, dateTime, description });
      } else {
        await ScheduleApi.updateSchedule(id, { title, dateTime, description });
      }
      await loadEvents();
      setIsFormOpen(false);
    } catch (e) {
      console.error(e);
      alert("일정 저장에 실패했습니다.");
    }
  };

  // 🔍 일정 클릭 → 상세보기 모달 열기
  const handleEventClick = (info) => {
    const clicked = {
      id: info.event.id,
      title: info.event.title,
      dateTime: info.event.startStr, // ISO 문자열
      description: info.event.extendedProps.description,
    };
    setSelectedEvent(clicked);
    setIsDetailOpen(true);
  };

  // ✏️ 상세 모달에서 "수정" 버튼 → 폼 모달 열기
  const handleEditFromDetail = () => {
    if (!selectedEvent) return;

    const [datePart, timePartRaw] = selectedEvent.dateTime.split("T");
    const timePart = (timePartRaw || "").slice(0, 5); // HH:mm

    setFormMode("edit");
    setFormInitial({
      id: selectedEvent.id,
      title: selectedEvent.title,
      date: datePart,
      time: timePart,
      description: selectedEvent.description || "",
    });

    setIsDetailOpen(false);
    setIsFormOpen(true);
  };

  // 🗑️ 상세 모달에서 "삭제" 버튼
  const handleDeleteFromDetail = async () => {
    if (!selectedEvent) return;
    if (!window.confirm("정말 이 일정을 삭제하시겠습니까?")) return;

    try {
      await ScheduleApi.deleteSchedule(selectedEvent.id);
      await loadEvents();
      setIsDetailOpen(false);
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };

  // URL ?date=YYYY-MM-DD 로 날짜 포커스
  useEffect(() => {
    const focusDate = searchParams.get("date");
    if (focusDate && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(focusDate);
    }
  }, [searchParams]);

  return (
    <div className="calendar-container">
      <h2 style={{ marginBottom: "20px" }}>📅 나의 일정 캘린더</h2>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        expandRows={true}
        dayMaxEventRows={false}
        dayMaxEvents={false}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDisplay="list-item"
        customButtons={{
          addSchedule: {
            text: "일정 추가 +",
            click: handlePlusClick,
          },
        }}
        headerToolbar={{
          left: "title",
          center: "",
          right: "addSchedule today prev,next",
        }}
      />

      {/* 🪟 생성/수정 폼 모달 */}
      {isFormOpen && (
        <ScheduleCreateModal
          mode={formMode}
          initialData={formInitial}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* 🔍 상세보기 모달 */}
      {isDetailOpen && selectedEvent && (
        <ScheduleModal
          event={selectedEvent}
          onClose={() => setIsDetailOpen(false)}
          onEdit={handleEditFromDetail}
          onDelete={handleDeleteFromDetail}
        />
      )}
    </div>
  );
}

export default SchedulePage;
