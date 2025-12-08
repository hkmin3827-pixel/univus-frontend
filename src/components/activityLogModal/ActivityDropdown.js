import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 380px;
  max-height: 480px;
  background: white;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const CategoryTabs = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CategoryTab = styled.div`
  margin-right: 10px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  background: ${({ active }) => (active ? "#edf1ff" : "transparent")};
  color: ${({ active }) => (active ? "#4a68f9" : "#666")};
`;

const FilterTabs = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FilterTab = styled.div`
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  background: ${({ active }) => (active ? "#f3f6ff" : "transparent")};
  color: ${({ active }) => (active ? "#4a68f9" : "#666")};
`;

const List = styled.div`
  overflow-y: auto;
  max-height: 380px;
`;

const Item = styled.div`
  background: #fafafa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  display: flex;
  transition: 0.15s;

  &:hover {
    background: #eef1ff;
  }
`;

const Message = styled.div`
  flex: 1;
  color: #333;
  white-space: pre-line;
`;

const Time = styled.div`
  font-size: 11px;
  color: #888;
`;

const RemoveBtn = styled.span`
  margin-left: 8px;
  font-size: 20px;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;

export default function ActivityDropdown({ onClose }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { teamId } = useParams();

  const {
    notifications,
    fetchTodo,
    fetchComment,
    markAsChecked,
    hasMore,
    setNotifications,
    setPage,
  } = useNotifications();

  const [category, setCategory] = useState("todo"); // 기본: 완료과제
  const [filter, setFilter] = useState("unchecked"); // 기본: 미확인

  useEffect(() => {
    if (!user?.id || !teamId) return;
    setPage(0);
    setNotifications([]);
    category === "todo"
      ? fetchTodo(user.id, teamId, true, filter === "unchecked")
      : fetchComment(user.id, teamId, true, filter === "unchecked");
  }, [user, category, filter]);

  const loadMore = () => {
    if (!hasMore) return;
    category === "todo"
      ? fetchTodo(user.id, teamId, false, filter === "unchecked")
      : fetchComment(user.id, teamId, false, filter === "unchecked");
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        onClose?.();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <Wrapper ref={dropdownRef}>
      <CategoryTabs>
        <CategoryTab
          active={category === "todo"}
          onClick={() => setCategory("todo")}
        >
          완료과제
        </CategoryTab>
        <CategoryTab
          active={category === "comment"}
          onClick={() => setCategory("comment")}
        >
          피드백
        </CategoryTab>
      </CategoryTabs>

      <FilterTabs>
        <FilterTab
          active={filter === "unchecked"}
          onClick={() => setFilter("unchecked")}
        >
          미확인
        </FilterTab>
        <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
          전체
        </FilterTab>
      </FilterTabs>

      <List
        onScroll={(e) => {
          const bottom =
            e.target.scrollHeight - e.target.scrollTop <=
            e.target.clientHeight + 1;
          if (bottom) loadMore();
        }}
      >
        {notifications.length === 0 && (
          <div style={{ padding: 15, textAlign: "center", color: "#888" }}>
            알림 없음
          </div>
        )}

        {notifications.map((n) => (
          <Item
            key={n.id}
            onClick={() => {
              if (category === "comment") {
                navigate(
                  `/team/${n.teamId}/board/${n.boardId}/post/detail/${n.postId}`
                );
              }
              // 전체 탭에서는 절대 사라지지 않음 (checked 처리X)
              // 미확인 탭에서도 카드 클릭만으로는 체크 처리X
            }}
          >
            <Message>{n.message}</Message>
            <Time>{n.createdAt?.replace("T", " ").split(".")[0]}</Time>

            {/* 미확인 탭에서만 X 버튼 표시 */}
            {filter === "unchecked" && (
              <RemoveBtn
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 이벤트 막기
                  markAsChecked(n.id); // 읽음 처리
                }}
              >
                ×
              </RemoveBtn>
            )}
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}
