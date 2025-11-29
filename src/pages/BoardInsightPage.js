// src/pages/BoardInsightPage.js
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// 카드 레이아웃 스타일
const PageContainer = styled.div`
  padding: 24px 32px;
  background: #f5f7ff;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
`;

const MemberItem = styled.li`
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

const MemberLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.src});
  background-color: #e5e7eb;
`;

const MemberName = styled.span`
  font-weight: 500;
`;

const PercentText = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  background: #f9fafb;
  font-size: 12px;
`;

const StatLabel = styled.div`
  color: #6b7280;
  margin-bottom: 2px;
`;

const StatValue = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: #9ca3af;
  margin-top: 20px;
`;

// 파이 차트 색상
const COLORS = [
  "#4f46e5",
  "#f97316",
  "#22c55e",
  "#e11d48",
  "#14b8a6",
  "#6366f1",
];

const BoardInsightPage = () => {
  const { boardId } = useParams(); // 라우트: /boards/:boardId/insight 이런 식 가정
  console.log("🔎 boardId =", boardId);
  const [members, setMembers] = useState([]); // 보드 전체 팀원 기여도
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 팀원
  const [detail, setDetail] = useState(null); // 선택된 팀원 상세
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // 1) 보드별 팀원 기여도 가져오기
  useEffect(() => {
    if (!boardId) return;

    const fetchBoardContribution = async () => {
      try {
        setLoading(true);
        console.log("🧩 effect triggered, boardId =", boardId);

        const res = await AxiosApi.getBoardContribution(boardId);
        console.log("🚀 res.data =", res.data);
        const list = res.data || [];
        setMembers(list);

        // 맨 첫 번째 팀원을 기본 선택
        if (list.length > 0) {
          handleSelectMember(list[0], boardId);
        }
      } catch (e) {
        console.error("보드 기여도 조회 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardContribution();
  }, [boardId]);

  // 2) 특정 팀원 클릭 시 상세 정보 가져오기
  const handleSelectMember = async (member, bId = boardId) => {
    try {
      setSelectedMember(member);
      setDetailLoading(true);
      const res = await AxiosApi.getUserContributionDetail(member.userId, bId);
      setDetail(res.data);
    } catch (e) {
      console.error("팀원 상세 기여도 조회 실패", e);
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // 3) 파이차트용 데이터 계산
  const pieData = useMemo(() => {
    if (!members || members.length === 0) return [];
    return members.map((m) => ({
      name: m.userName,
      value: m.contributionScore,
      userId: m.userId,
      userImage: m.userImage,
    }));
  }, [members]);

  const totalScore = useMemo(
    () => pieData.reduce((sum, d) => sum + d.value, 0),
    [pieData]
  );

  // 4) 상세 그래프용 데이터 (카테고리별 막대 그래프)
  const detailChartData = useMemo(() => {
    if (!detail) return [];
    return [
      { name: "게시글", value: detail.postCount },
      { name: "댓글", value: detail.commentCount },
      { name: "리액션", value: detail.reactionCount },
      { name: "투두완료", value: detail.todoCompleted },
      { name: "출석일", value: detail.attendanceTotal },
    ];
  }, [detail]);

  return (
    <PageContainer>
      <Title>팀 인사이트</Title>
      <Grid>
        {/* 왼쪽: 팀원별 기여도 파이차트 */}
        <Card>
          <CardTitle>팀원별 활동 기여도</CardTitle>
          {loading ? (
            <EmptyText>불러오는 중...</EmptyText>
          ) : pieData.length === 0 ? (
            <EmptyText>데이터가 없습니다.</EmptyText>
          ) : (
            <>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      onClick={(data, index) =>
                        handleSelectMember(members[index])
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          cursor="pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <MemberList>
                {members.map((m, idx) => {
                  const percent =
                    totalScore > 0
                      ? ((m.contributionScore / totalScore) * 100).toFixed(1)
                      : 0;

                  const active =
                    selectedMember && selectedMember.userId === m.userId;

                  return (
                    <MemberItem
                      key={m.userId}
                      active={!!active}
                      onClick={() => handleSelectMember(m)}
                    >
                      <MemberLeft>
                        <Avatar src={m.userImage} />
                        <MemberName>
                          {idx + 1}. {m.userName}
                        </MemberName>
                      </MemberLeft>
                      <PercentText>{percent}%</PercentText>
                    </MemberItem>
                  );
                })}
              </MemberList>
            </>
          )}
        </Card>

        {/* 오른쪽: 선택한 팀원 상세 */}
        <Card>
          <CardTitle>팀원 상세 활동 인사이트</CardTitle>

          {!selectedMember ? (
            <EmptyText>왼쪽에서 팀원을 선택하세요.</EmptyText>
          ) : detailLoading ? (
            <EmptyText>팀원 데이터를 불러오는 중...</EmptyText>
          ) : !detail ? (
            <EmptyText>데이터가 없습니다.</EmptyText>
          ) : (
            <>
              {/* 상단 프로필 + 총점 */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar
                  src={detail.userImage}
                  style={{ width: 40, height: 40 }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{detail.userName}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    총 기여도 점수{" "}
                    <span style={{ fontWeight: 700, color: "#4f46e5" }}>
                      {detail.contributionScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* 통계 카드 */}
              <StatGrid>
                <StatCard>
                  <StatLabel>게시글</StatLabel>
                  <StatValue>{detail.postCount}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>댓글</StatLabel>
                  <StatValue>{detail.commentCount}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>리액션</StatLabel>
                  <StatValue>{detail.reactionCount}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>투두 완료</StatLabel>
                  <StatValue>{detail.todoCompleted}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>투두 미완료</StatLabel>
                  <StatValue>{detail.todoUncompleted}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>총 출석일</StatLabel>
                  <StatValue>{detail.attendanceTotal}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>연속 출석</StatLabel>
                  <StatValue>{detail.attendanceStreak}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>이번 달 출석</StatLabel>
                  <StatValue>{detail.attendanceThisMonth}</StatValue>
                </StatCard>
              </StatGrid>

              {/* 카테고리별 활동 그래프 (막대차트) */}
              <div style={{ width: "100%", height: 220, marginTop: 18 }}>
                <ResponsiveContainer>
                  <BarChart data={detailChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default BoardInsightPage;
