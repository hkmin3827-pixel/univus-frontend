// src/api/TeamApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8111/teams",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const TeamApi = {
  createTeam: async (teamName, description, leaderId) => {
    return await api.post("/create", { teamName, description, leaderId });
  },
  inviteTeamMember: async (teamName, email) => {
    return await api.post(`/${teamName}/invite`, { email });
  },
  getTeam: async (teamName) => {
    return await api.get(`/${teamName}`);
  },
  getInvites: async (email) => {
    return await api.get(`/invites?email=${email}`);
  },
  acceptInvite: async (inviteId) => {
    return await api.post(`/invite/${inviteId}/accept`);
  },
  declineInvite: async (inviteId) => {
    return await api.post(`/invite/${inviteId}/decline`);
  },
};

export default TeamApi;
