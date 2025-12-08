// src/context/TeamContext.js
import { createContext, useState, useEffect } from "react";
import TeamApi from "../api/TeamApi";

export const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState(() => {
    const saved = localStorage.getItem("selectedTeam");
    return saved ? JSON.parse(saved) : null;
  });
  const [myTeams, setMyTeams] = useState([]);
  const updateTeam = (team) => {
    setSelectedTeam(team);
    if (team) {
      localStorage.setItem("selectedTeam", JSON.stringify(team));
    } else {
      localStorage.removeItem("selectedTeam");
    }
  };
  const fetchTeams = async () => {
    try {
      const res = await TeamApi.getMyTeams();
      const teams = res.data;
      setMyTeams(teams);

      // 팀 없을 경우 선택된 팀 초기화
      if (!teams || teams.length === 0) {
        updateTeam(null);
        return teams;
      }

      // 기존 선택된 팀 유지
      if (selectedTeam) {
        const updated = teams.find((t) => t.id === selectedTeam.id);
        if (updated) {
          updateTeam(updated);
        } else {
          updateTeam(null);
        }
      }
      return teams;
    } catch (err) {
      console.error("팀 목록 불러오기 실패", err);
      updateTeam(null); // 요청 실패 시에도 초기화
      return [];
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        myTeams,
        setMyTeams,
        fetchTeams,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
