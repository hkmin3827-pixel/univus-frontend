// src/pages/SchedulePage.js
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSearchParams } from "react-router-dom";
import ScheduleApi from "../api/ScheduleApi";
import "../styles/SchedulePage.css";

import ScheduleModal from "../components/home/ScheduleModal";

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [searchParams] = useSearchParams();
  const calendarRef = useRef(null);

  // 일정 생성 모달 상태
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState("");

  // 일정 목록 불러오기
  const loadEvents = async () => {
    try {
      const res = await ScheduleApi.getAllSchedules();
      const mapped = res.data.map((e) => ({
        id: e.id,
        title: e.title,
        start: e.dateTime, // "2025-11-29T14:00" 같은 형식
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

  // 헤더의 버튼 클릭 (오늘 날짜 기본값)
  const handlePlusClick = () => {
    const today = new Date().toISOString().slice(0, 10); // yyyy-MM-dd
    setDefaultDate(today);
    setIsCreateOpen(true);
  };

  // 날짜 칸 클릭 → 해당 날짜를 기본값으로 모달 열기
  const handleDateClick = (info) => {
    const onlyDate = info.dateStr.slice(0, 10); // yyyy-MM-dd
    setDefaultDate(onlyDate);
    setIsCreateOpen(true);
  };

  // 모달에서 "저장" 클릭
  const handleCreateSubmit = async ({ title, date, time, description }) => {
    const dateTime = `${date}T${time}`; // 예: 2025-11-30T14:00

    try {
      await ScheduleApi.createSchedule({
        title,
        dateTime,
        description,
      });
      await loadEvents();
      setIsCreateOpen(false);
    } catch (e) {
      console.error(e);
      alert("일정 생성에 실패했습니다.");
    }
  };

  // 기존 일정 클릭 시: 수정 / 삭제
  const handleEventClick = async (info) => {
    const action = window.prompt(
      `[${info.event.title}] 선택한 일정:\n1 = 수정\n2 = 삭제\n취소 = Enter`
    );

    if (action === "1") {
      const newTitle = prompt("새 제목 입력", info.event.title);
      if (!newTitle) return;

      const newDate = prompt(
        "새 날짜 입력 (YYYY-MM-DDTHH:mm)",
        info.event.startStr
      );

      await ScheduleApi.updateSchedule(info.event.id, {
        title: newTitle,
        dateTime: newDate,
      });

      loadEvents();
    }

    if (action === "2") {
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
      await ScheduleApi.deleteSchedule(info.event.id);
      loadEvents();
    }
  };

  // URL ?date=2025-11-30 같은 걸로 포커스 이동
  useEffect(() => {
    const focusDate = searchParams.get("date");
    if (focusDate && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(focusDate);
    }
  }, [searchParams]);

  return (
    <div className="calendar-container" style={{ margin: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>📅 나의 일정 캘린더</h2>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="100%"
        expandRows={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        // 커스텀 버튼 정의
        customButtons={{
          addSchedule: {
            text: "일정 추가 +",
            click: handlePlusClick,
          },
        }}
        // 헤더 툴바 설정
        headerToolbar={{
          left: "title",
          center: "",
          right: "addSchedule today prev,next",
        }}
      />

      {/* 일정 생성 모달 */}
      {isCreateOpen && (
        <ScheduleModal
          defaultDate={defaultDate}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateSubmit}
        />
      )}
    </div>
  );
}

export default SchedulePage;
