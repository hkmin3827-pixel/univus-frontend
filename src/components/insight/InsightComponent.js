import styled from "styled-components";

// 페이지 전체 컨테이너
export const PageContainer = styled.div`
  padding: 24px 32px;
  background: #f5f7ff;
  min-height: 100vh;
  box-sizing: border-box;
`;

// 상단 제목
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

// 2 x 2 카드 레이아웃
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// 기본 카드
export const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
`;

export const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

// 팀원 리스트
export const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
`;

export const MemberItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;

  background: ${(props) => (props.active ? "#eef2ff" : "transparent")};

  &:hover {
    background: #eef2ff;
  }
`;

export const MemberLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.src});
  background-color: #e5e7eb;
`;

export const MemberName = styled.span`
  font-weight: 500;
`;

export const PercentText = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const EmptyText = styled.div`
  font-size: 14px;
  color: #9ca3af;
  margin-top: 20px;
`;

/* --- TOP5 카드용 스타일 --- */

export const RankList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
`;

export const RankItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 9px;
  font-size: 14px;

  &:hover {
    background: #f3f4ff;
  }
`;

export const RankLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RankNum = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef2ff;
  font-size: 12px;
  font-weight: 600;
  color: #4f46e5;
`;

export const RankName = styled.div`
  font-weight: 500;
`;

export const RankCount = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #4b5563;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

export const StatCard = styled.div`
  background: #f9fafb;
  padding: 12px;
  border-radius: 10px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

// 파이 차트 공통 색상
export const COLORS = [
  "#4f46e5",
  "#f97316",
  "#22c55e",
  "#e11d48",
  "#14b8a6",
  "#6366f1",
];
