import { createContext, useContext, useState } from "react";
import { getTeamCompletedTodos } from "../api/TodoApi";

export const ActivityLogContext = createContext();

export const ActivityLogProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const refreshActivities = async (teamId) => {
    try {
      const res = await getTeamCompletedTodos(teamId);
      setActivities(res.data);
    } catch (err) {
      console.error("활동 로그 갱신 실패", err);
    }
  };

  return (
    <ActivityLogContext.Provider value={{ activities, refreshActivities }}>
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = () => useContext(ActivityLogContext);
