import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { TeamContext } from "../../context/TeamContext";
import { useActivityLog } from "../../context/ActivityLogContext";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 450px;
  max-height: 80vh;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  float: right;
`;

const ActivityItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

function ActivityLogModal({ onClose }) {
  const { selectedTeam } = useContext(TeamContext);
  const { activities, refreshActivities } = useActivityLog();

  useEffect(() => {
    if (!selectedTeam) return;
    refreshActivities(selectedTeam.id);
  }, [selectedTeam, refreshActivities]);

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>

        <h3 style={{ marginBottom: "15px" }}>
          {selectedTeam.teamName} 팀 활동 알림
        </h3>

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
      </ModalBox>
    </Backdrop>
  );
}

export default ActivityLogModal;
