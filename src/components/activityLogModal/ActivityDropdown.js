import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";

/* ------------------ Wrapper ------------------ */
const Wrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  width: 400px;
  max-height: 560px;
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 939px) {
    width: 300px;
  }
`;

/* ------------------ Tabs ------------------ */
const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

const CategoryTab = styled.div`
  padding: 7px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "500" : "400")};
  background: ${({ active }) => (active ? "#A294F9" : "transparent")};
  color: ${({ active }) => (active ? "rgb(78, 47, 169)" : "#666")};
  transition: 0.15s;

  &:hover {
    background: #f5efff;
  }

  @media screen and (max-width: 939px) {
    font-size: 13px;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  padding: 10px 10px;
  background-color: #f7f6f6ff;
  border-radius: 10px;
`;

const FilterTab = styled.div`
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "500" : "400")};
  background: ${({ active }) => (active ? "#A294F9" : "white")};
  color: ${({ active }) => (active ? "rgb(78, 47, 169)" : "#777")};
  transition: 0.15s;

  &:hover {
    background: #f5efff;
  }

  @media screen and (max-width: 939px) {
    font-size: 12px;
  }
`;

/* ------------------ List ------------------ */
const List = styled.div`
  overflow-y: auto;
  max-height: 440px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;

  /* 스크롤바 디자인 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d5e7;
    border-radius: 10px;
  }
`;

const Item = styled.div`
  background: #fafafa;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  position: relative;
  border: 1px solid #eee;
  transition: 0.15s;

  &:hover {
    background: #eef1ff;
    border-color: #dce2ff;
  }
`;

/* ------------------ Item Content ------------------ */
const IconArea = styled.div`
  font-size: 23px;
  margin-top: 2px;
`;

const MessageArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
  color: #333;
`;

const Text = styled.div`
  white-space: pre-line;
  word-break: break-word;
  color: #444;
  line-height: 1.35;
  font-size: 14px;
`;

const Time = styled.div`
  font-size: 11px;
  color: #888;
  text-align: right;
  margin-top: 3px;
`;

const RemoveBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;

/* ======================================================== */

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

  const [category, setCategory] = useState("todo");
  const [filter, setFilter] = useState("unchecked");

  /* 처음 로딩 및 탭 변경 시 데이터 로드 */
  useEffect(() => {
    if (!user?.id || !teamId) return;

    setPage(0);
    setNotifications([]);

    const isUnchecked = filter === "unchecked";

    if (category === "todo") fetchTodo(user.id, teamId, true, isUnchecked);
    else fetchComment(user.id, teamId, true, isUnchecked);
  }, [user, category, filter]);

  const loadMore = () => {
    if (!hasMore) return;

    const isUnchecked = filter === "unchecked";
    if (category === "todo") fetchTodo(user.id, teamId, false, isUnchecked);
    else fetchComment(user.id, teamId, false, isUnchecked);
  };

  /* 바깥 클릭 시 닫기 */
  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest(".topbar")) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        onClose?.();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 아이콘 타입 */
  const icon = category === "todo" ? "📘" : "💬";

  /* 메시지 파싱 함수 */
  const parseMessage = (msg) => {
    const match = msg.match(/(.+?)님이 '(.+?)'/);
    if (!match) return { text: msg };
    return { text: msg };
  };

  return (
    <Wrapper ref={dropdownRef}>
      {/* 카테고리 선택 */}
      <CategoryTabs>
        <CategoryTab
          active={category === "todo"}
          onClick={() => setCategory("todo")}
        >
          완료된 TODO
        </CategoryTab>

        <CategoryTab
          active={category === "comment"}
          onClick={() => setCategory("comment")}
        >
          FEEDBACK
        </CategoryTab>
      </CategoryTabs>

      {/* 필터 선택 */}
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

      {/* 알림 목록 */}
      <List
        onScroll={(e) => {
          const bottom =
            e.target.scrollHeight - e.target.scrollTop <=
            e.target.clientHeight + 1;
          if (bottom) loadMore();
        }}
      >
        {notifications.length === 0 && (
          <div
            style={{
              padding: 20,
              textAlign: "center",
              color: "#999",
              fontSize: "14px",
            }}
          >
            알림 없음
          </div>
        )}

        {notifications.map((n) => {
          const parsed = parseMessage(n.message);

          return (
            <Item
              key={n.id}
              onClick={() => {
                if (category === "comment") {
                  navigate(
                    `/team/${n.teamId}/board/${n.boardId}/post/detail/${n.postId}`
                  );
                }
              }}
            >
              <IconArea>{icon}</IconArea>

              <MessageArea>
                <UserName>{parsed.user}</UserName>
                <Text>{parsed.text}</Text>
                <Time>{n.createdAt?.replace("T", " ").split(".")[0]}</Time>
              </MessageArea>

              {filter === "unchecked" && (
                <RemoveBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsChecked(n.id);
                  }}
                >
                  ×
                </RemoveBtn>
              )}
            </Item>
          );
        })}
      </List>
    </Wrapper>
  );
}
