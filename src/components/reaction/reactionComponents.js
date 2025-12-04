import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ReactionApi from "../../api/ReactionApi";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@12,400,0,0&icon_names=sentiment_satisfied,sentiment_neutral,sentiment_dissatisfied"
/>;

const Wrapper = styled.div`
  margin: 16px 0;
  padding: 12px 0;
  display: flex;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ReactionButton = styled.button`
  padding: 6px 10px;
  margin-top: 4px;
  font-size: 14px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  cursor: pointer;
  min-width: 90px;
  transition: 0.15s ease-in-out;

  /* 아이콘 + 숫자를 가로로 나란히 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  /* 아이콘과 숫자 둘 다 이 크기를 쓰게 됨 */
  font-size: 20px;

  /* 아이콘도 동일한 크기로 강제 */
  .material-symbols-outlined {
    font-size: 18px;
    line-height: 1;
  }

  &:not(:disabled):hover {
    border-color: #9484ffff;
    background: #f5efff;
  }

  &:not(:disabled):hover .material-symbols-outlined {
    color: #9484ffff;
  }

  ${(props) =>
    props.active &&
    css`
      border-color: #a294f9;
      background: #eef2ff;
      font-weight: 600;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: default;
    `}
`;

const ReactionBar = ({ postId }) => {
  const [reactions, setReactions] = useState([]);
  const [myReaction, setMyReaction] = useState(null); // "POSITIVE" | "NEUTRAL" | "NEGATIVE" | null
  const [loading, setLoading] = useState(false);

  const loadReactions = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await ReactionApi.getReactions(postId);
      const list = res.data || [];
      setReactions(list);

      const mine = list.find((r) => r.mine);
      setMyReaction(mine ? mine.type : null);
    } catch (e) {
      console.error("리액션 조회 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const countByType = (type) => reactions.filter((r) => r.type === type).length;

  const positiveCount = countByType("POSITIVE");
  const neutralCount = countByType("NEUTRAL");
  const negativeCount = countByType("NEGATIVE");

  const handleClick = async (type) => {
    if (loading) return;
    try {
      setLoading(true);

      // 여기서 wrapper 메서드 호출
      const res = await ReactionApi.toggleReaction(postId, type);

      const newType = res.data; // null 또는 "POSITIVE"
      setMyReaction(newType || null);

      await loadReactions();
    } catch (e) {
      console.error("리액션 토글 실패:", e);
      // 여기에서 e.response?.status, e.response?.data를 같이 찍어보면 서버 에러도 확인 가능
      alert("리액션 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <ButtonGroup>
        <ReactionButton
          onClick={() => handleClick("POSITIVE")}
          active={myReaction === "POSITIVE"}
          disabled={loading}
        >
          <span class="material-symbols-outlined">sentiment_satisfied</span>
          {positiveCount}
        </ReactionButton>

        <ReactionButton
          onClick={() => handleClick("NEUTRAL")}
          active={myReaction === "NEUTRAL"}
          disabled={loading}
        >
          <span class="material-symbols-outlined">sentiment_neutral</span>
          {neutralCount}
        </ReactionButton>

        <ReactionButton
          onClick={() => handleClick("NEGATIVE")}
          active={myReaction === "NEGATIVE"}
          disabled={loading}
        >
          <span class="material-symbols-outlined">sentiment_dissatisfied</span>
          {negativeCount}
        </ReactionButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default ReactionBar;
