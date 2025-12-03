import React, { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { TeamContext } from "../../context/TeamContext";
import { useActivityLog } from "../../context/ActivityLogContext";

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 320px;
  max-height: 400px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1000;
  animation: fadeSlide 0.2s ease-out;

  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Tail = styled.div`
  position: absolute;
  top: -8px;
  right: 30px;
  width: 16px;
  height: 16px;
  background: white;
  transform: rotate(45deg);
  box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.05);
`;

const Item = styled.div`
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #eee;
`;

function ActivityDropdown({ closeDropdown }) {
  const { selectedTeam } = useContext(TeamContext);
  const { activities, refreshActivities } = useActivityLog();
  const ref = useRef();

  useEffect(() => {
    if (selectedTeam) refreshActivities(selectedTeam.id);

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedTeam]);

  return (
    <Wrapper
      ref={ref}
      onClick={(e) => e.stopPropagation()} // 클릭 전파 막기
    >
      <Tail />
      <h4 style={{ marginBottom: "10px" }}>
        {selectedTeam?.teamName} 활동 알림
      </h4>
      {activities.length === 0 ? (
        <p>완료된 업무가 없습니다.</p>
      ) : (
        activities.map((todo) => (
          <Item key={todo.id}>
            {todo.userName}님이 {todo.boardName}의 "{todo.content}" 업무를
            완료했습니다.
          </Item>
        ))
      )}
    </Wrapper>
  );
}

export default ActivityDropdown;
