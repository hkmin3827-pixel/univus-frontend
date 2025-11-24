import axios from "./AxiosApi";

const ScheduleApi = {
  getHomeSchedules: () => axios.get("/api/schedules/home"),
  getAllSchedules: () => axios.get("/api/schedules"),
  createSchedule: (data) => axios.post("/api/schedules", data),
  updateSchedule: (id, data) => axios.put(`/api/schedules/${id}`, data),
  deleteSchedule: (id) => axios.delete(`/api/schedules/${id}`),
};

export default ScheduleApi;
