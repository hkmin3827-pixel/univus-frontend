// src/pages/Home.js
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ScheduleApi from "../api/ScheduleApi";
import ScheduleModal from "../components/home/ScheduleModal";
import ScheduleCreateModal from "./ScheduleCreateModal";
import "../styles/HomeSchedule.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ✏ 수정 모달 상태
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editInitialData, setEditInitialData] = useState(null);
  // 날짜 필터 계산
  const now = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(now.getDate() + 7);

  // 이벤트 필터링 (현재 ~ 7일 뒤)
  const upcomingEvents = events.filter((item) => {
    const eventDate = new Date(item.start);
    return eventDate >= now && eventDate <= sevenDaysLater;
  });
  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const res = await ScheduleApi.getAllSchedules();
      setEvents(
        res.data.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.dateTime, // "2025-11-30T14:00"
          description: e.description || "",
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑 삭제 버튼 클릭 시
  const handleDelete = async () => {
    if (!selectedEvent) return;
    if (!window.confirm("정말 이 일정을 삭제하시겠습니까?")) return;

    try {
      await ScheduleApi.deleteSchedule(selectedEvent.id);
      await loadSchedules();
      setSelectedEvent(null);
      alert("일정이 삭제되었습니다.");
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했습니다.");
    }
  };

  // ✏ 상세 모달에서 "수정" 버튼 클릭 시 → 수정 모달 열기
  const handleEdit = () => {
    if (!selectedEvent) return;

    // start 또는 dateTime 중 하나를 사용
    const rawDateTime =
      selectedEvent.start || selectedEvent.dateTime || selectedEvent.date;

    let datePart = "";
    let timePart = "";

    if (rawDateTime) {
      const [d, t] = rawDateTime.split("T");
      datePart = d;
      timePart = (t || "").slice(0, 5); // HH:mm
    }

    setEditInitialData({
      id: selectedEvent.id,
      title: selectedEvent.title,
      date: datePart,
      time: timePart,
      description: selectedEvent.description || "",
    });

    setIsEditOpen(true);
    setSelectedEvent(null); // 상세 모달 닫기
  };

  // ✏ 수정 모달에서 "저장" 클릭 시
  const handleEditSubmit = async ({ id, title, date, time, description }) => {
    const dateTime = `${date}T${time}`; // "2025-11-30T14:00"

    try {
      await ScheduleApi.updateSchedule(id, {
        title,
        dateTime,
        description,
      });
      await loadSchedules();
      setIsEditOpen(false);
      alert("일정이 수정되었습니다.");
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="home-container">
      {/* 캘린더 */}
      <div className="calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={(info) => {
            const event = events.find((e) => e.id === info.event.id);
            setSelectedEvent(event);
          }}
          dayMaxEvents={2}
          height="100%"
          displayEventTime={false}
          dayMaxEventRows={false}
          headerToolbar={{
            left: "title",
            right: "today prev,next",
          }}
        />
      </div>

      {/* 예정된 일정 리스트 */}
      <div className="schedule-box">
        <h3>📌 예정된 일정 &lt;7days later&gt;</h3>
        {upcomingEvents.length === 0 ? (
          <p className="empty">등록된 일정이 없습니다.</p>
        ) : (
          upcomingEvents.map((item) => (
            <div
              key={item.id}
              className="schedule-item"
              onClick={() => setSelectedEvent(item)}
            >
              <div className="dot"></div>
              <div>
                <p className="title">{item.title}</p>
                <p className="date">{new Date(item.start).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* 🔍 상세 모달 (보기 + 수정/삭제 버튼) */}
      {selectedEvent && (
        <ScheduleModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* ✏ 수정 모달 (날짜/시간 따로 입력) */}
      {isEditOpen && (
        <ScheduleCreateModal
          mode="edit"
          initialData={editInitialData}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

export default Home;
