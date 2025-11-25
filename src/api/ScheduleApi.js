// src/api/ScheduleApi.js
import axios from "axios";

// 백엔드 서버 주소
const BASE_URL = "http://localhost:8111";

// 모든 요청에 세션 쿠키(JSESSIONID) 포함
axios.defaults.withCredentials = true;

// 📌 일정 전용 axios 인스턴스
const scheduleApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 📌 일정 API 모듈
const ScheduleApi = {
  // 일정 생성
  createSchedule: (data) => scheduleApi.post("/api/schedules", data),

  // 전체 일정 조회
  getAllSchedules: () => scheduleApi.get("/api/schedules"),

  // 홈 화면 일정 (오늘+7일 이내)
  getHomeSchedules: () => scheduleApi.get("/api/schedules/home"),

  // 일정 수정
  updateSchedule: (id, data) => scheduleApi.put(`/api/schedules/${id}`, data),

  // 일정 삭제
  deleteSchedule: (id) => scheduleApi.delete(`/api/schedules/${id}`),
};

export default ScheduleApi;
