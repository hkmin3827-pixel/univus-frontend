// src/pages/MemberInsightPage.js
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

import {
  PageContainer,
  Title,
  Card,
  CardTitle,
  Avatar,
  StatGrid,
  StatCard,
  StatLabel,
  StatValue,
  EmptyText,
  COLORS,
} from "../components/insight/InsightComponent";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MemberInsightPage = () => {
  const { boardId, userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // 리스트에서 전달된 멤버 정보 (state)
  const member = location.state?.member;

  /* 1) 팀원 상세 데이터 */
  useEffect(() => {
    if (!userId || !boardId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await AxiosApi.getUserContributionDetail(userId, boardId);

        console.log("📌 team member detail:", res.data);

        setDetail(res.data);
      } catch (e) {
        console.error("❌ 팀원 상세 조회 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [boardId, userId]);

  /* 2) 막대 차트 데이터 */
  const chartData = useMemo(() => {
    if (!detail) return [];
    return [
      { name: "리포트", value: detail.postCount },
      { name: "피드백", value: detail.commentCount },
      { name: "리액션", value: detail.reactionCount },
      { name: "투두 완료", value: detail.todoCompleted },
      { name: "투두 미완료", value: detail.todoUncompleted },
      { name: "출석일", value: detail.attendanceTotal },
    ];
  }, [detail]);

  return (
    <PageContainer>
      <Title>팀원 상세 활동 인사이트</Title>

      <Card style={{ marginBottom: 20 }}>
        {loading ? (
          <EmptyText>불러오는 중...</EmptyText>
        ) : !detail ? (
          <EmptyText>데이터가 없습니다.</EmptyText>
        ) : (
          <>
            {/* 상단 프로필 정보 */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar
                src={detail.userImage}
                style={{ width: 50, height: 50 }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>
                  {detail.userName}
                </div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>
                  총 기여도 점수{" "}
                  <span style={{ fontWeight: 700, color: "#4f46e5" }}>
                    {detail.contributionScore}
                  </span>
                </div>
              </div>
            </div>

            {/* 수치 카드 */}
            <StatGrid style={{ marginTop: 20 }}>
              <StatCard>
                <StatLabel>리포트</StatLabel>
                <StatValue>{detail.postCount}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>피드백</StatLabel>
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

            {/* 막대 차트 */}
            <div style={{ width: "100%", height: 260, marginTop: 24 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill={COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </Card>

      {/* 뒤로가기 버튼 */}
      <Card
        style={{
          cursor: "pointer",
          textAlign: "center",
          fontWeight: 600,
          color: "#4f46e5",
        }}
        onClick={() => navigate(`/boards/${boardId}/insight`)}
      >
        ← 팀 인사이트로 돌아가기
      </Card>
    </PageContainer>
  );
};

export default MemberInsightPage;
