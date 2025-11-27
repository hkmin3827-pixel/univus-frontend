import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ScheduleApi from "../api/ScheduleApi";
import ScheduleModal from "../components/home/ScheduleModal";
import "../styles/HomeSchedule.css";

function TeamPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          start: e.dateTime,
          description: e.description || "",
        }))
      );
    } catch (err) {
      console.error(err);
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
          height="100%" // ← 이 값으로 고정
          headerToolbar={{
            left: "title",
            right: "today prev,next",
          }}
        />
      </div>

      {/* 예정된 일정 */}
      <div className="schedule-box">
        <h3>📌 예정된 일정</h3>
        {events.length === 0 ? (
          <p className="empty">등록된 일정이 없습니다.</p>
        ) : (
          events.map((item) => (
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

      {selectedEvent && (
        <ScheduleModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default TeamPage;
