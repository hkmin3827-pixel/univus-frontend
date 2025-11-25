import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ScheduleApi from "../api/ScheduleApi";
import "../styles/SchedulePage.css";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

function SchedulePage() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const res = await ScheduleApi.getAllSchedules(); // 추가 API 필요
      const mapped = res.data.map((e) => ({
        id: e.id,
        title: e.title,
        date: e.dateTime, // ISO LocalDateTime 지원
      }));
      setEvents(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDateClick = async (info) => {
    console.log("함수 실행 TEST");
    console.log("📌 날짜 클릭됨:", info.dateStr);

    const title = prompt("일정 제목을 입력하세요");
    console.log("📌 입력한 제목:", title);
    if (!title) return;

    const dateTime = prompt(
      "시간 포함 날짜 입력 (예: 2025-11-29T14:00):",
      info.dateStr
    );
    console.log("📌 입력한 날짜/시간:", dateTime);

    const data = { title, dateTime };
    console.log("📌 서버로 보낼 데이터:", data);

    try {
      console.log("🚀 요청 시작...");
      const response = await ScheduleApi.createSchedule(data);
      console.log("✅ 서버 응답:", response);

      loadEvents();
    } catch (e) {
      console.error("❌ 요청 실패:", e.response || e);
      alert("생성 실패");
    }
  };

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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const focusDate = searchParams.get("date");
    if (focusDate && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(focusDate);
    }
  }, [searchParams]);
  const calendarRef = useRef(null);
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
      />
    </div>
  );
}

export default SchedulePage;
