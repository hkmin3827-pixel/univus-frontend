// 팀별 활동 완료 알람 (ActivityLog.js)
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TeamContext } from "../context/TeamContext";
import { getTeamCompletedTodos } from "../api/TodoApi";
import { useActivityLog } from "../context/ActivityLogContext";

const Container = styled.div`
  padding: 20px;
`;

const ActivityItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

function ActivityLog() {
  const { selectedTeam } = useContext(TeamContext);
  const { activities, refreshActivities } = useActivityLog();

  useEffect(() => {
    if (!selectedTeam) return;
    console.log("refreshActivities 호출됨");
    refreshActivities(selectedTeam.id);
  }, [selectedTeam, refreshActivities]);
  return (
    <Container>
      <h2>{selectedTeam.teamName} 팀 활동 알람</h2>
      {activities.length === 0 ? (
        <p>완료된 업무가 없습니다.</p>
      ) : (
        activities.map((todo) => (
          <ActivityItem key={todo.id}>
            {todo.userName}님이 {todo.boardName} 프로젝트의 "{todo.content}"
            업무를 완료했습니다.
          </ActivityItem>
        ))
      )}
    </Container>
  );
}

export default ActivityLog;
