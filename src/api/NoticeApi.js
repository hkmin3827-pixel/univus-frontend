import axios from "axios";

const BASE_URL = "http://localhost:8111";

// 팀별 공지 목록 조회
export const getNoticeListByTeam = (teamId, page = 0, size = 10) => {
  return axios.get(
    `${BASE_URL}/team/${teamId}/notice/list?page=${page}&size=${size}`
  );
};

// 공지 상세 조회
export const getNotice = (teamId, id) => {
  return axios.get(`${BASE_URL}/team/${teamId}/notice/${id}`);
};

// 공지 생성
export const createNotice = (teamId, data) => {
  return axios.post(`${BASE_URL}/team/${teamId}/notice/create`, data);
};

// 공지 수정
export const updateNotice = (teamId, id, data) => {
  return axios.put(`${BASE_URL}/team/${teamId}/notice/modify/${id}`, data);
};

// 공지 삭제
export const deleteNotice = (teamId, id) => {
  return axios.delete(`${BASE_URL}/team/${teamId}/notice/delete/${id}`);
};
