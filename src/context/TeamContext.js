// src/context/TeamContext.js
import { createContext, useState } from "react";
import TeamApi from "../api/TeamApi";

export const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [myTeams, setMyTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const res = await TeamApi.getMyTeams();
      const teams = res.data;
      setMyTeams(teams);

      // 팀 없을 경우 선택된 팀 초기화
      if (!teams || teams.length === 0) {
        setSelectedTeam(null);
        return;
      }

      // 기존 선택된 팀 유지
      if (selectedTeam) {
        const updated = teams.find((t) => t.id === selectedTeam.id);
        if (updated) {
          setSelectedTeam(updated);
        } else {
          setSelectedTeam(null);
        }
      }
    } catch (err) {
      console.error("팀 목록 불러오기 실패", err);
      setSelectedTeam(null); // 요청 실패 시에도 초기화
    }
  };

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
