import axios from "axios";

// 백엔드 서버 주소
const BASE_URL = "http://localhost:8111";

// 모든 요청에 세션 쿠키(JSESSIONID) 포함
axios.defaults.withCredentials = true;

// 팀 전용 axios 인스턴스
const teamApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 👥 팀 관련 API 모듈
const TeamApi = {
  // 팀 생성: POST /teams
  // 사용 예: TeamApi.createTeam("팀 이름", "팀 소개")
  createTeam: (teamName, description) =>
    teamApi.post("/teams", { teamName, description }),

  // 팀 상세 조회: GET /teams/{teamId}
  getTeam: (teamId) => teamApi.get(`/teams/${teamId}`),

  // 초대 URL 생성: POST /teams/{teamId}/invites
  createTeamInvite: (teamId) => teamApi.post(`/teams/${teamId}/invites`),

  // 초대 정보 조회: GET /teams/invites/{token}
  getInviteInfo: (token) => teamApi.get(`/teams/invites/${token}`),

  // 초대 수락: POST /teams/invites/{token}/accept
  acceptInvite: (token) => teamApi.post(`/teams/invites/${token}/accept`),
  getInviteInfo: (token) => teamApi.get(`/teams/invites/${token}`),

  acceptInvite: (token) => teamApi.post(`/teams/invites/${token}/accept`),

  getMyTeams: () => axios.get(`${BASE_URL}/teams/my`),
  getBoardsByTeam: (teamId) => axios.get(`${BASE_URL}/board/team/${teamId}`),
};

export default TeamApi;
