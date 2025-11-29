import axios from "axios";

const BASE_URL = "http://localhost:8111";
const API = `${BASE_URL}/notice`;

// 공지 목록 조회
export const getNoticeList = (page = 0, size = 10) => {
  return axios.get(`${API}/list?page=${page}&size=${size}`);
};

// 공지 상세 조회
export const getNotice = (id) => {
  return axios.get(`${API}/${id}`);
};

// 공지 생성
export const createNotice = (data) => {
  return axios.post(`${API}/create`, data);
};

// 공지 수정
export const updateNotice = (id, data) => {
  return axios.put(`${API}/modify/${id}`, data);
};

// 공지 삭제
export const deleteNotice = (id) => {
  return axios.delete(`${API}/delete/${id}`);
};
