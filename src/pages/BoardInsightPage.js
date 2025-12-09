// src/pages/BoardInsightPage.js
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import useBoardAutoAttendance from "../hooks/useBoardAutoAttendance";
import profileDefaultImg from "../images/profileDefaultImg.png";

import {
  PageContainer,
  Title,
  Grid,
  Card,
  CardTitle,
  MemberList,
  MemberItem,
  MemberLeft,
  Avatar,
  MemberName,
  PercentText,
  EmptyText,
  RankList,
  RankItem,
  RankLeft,
  RankNum,
  RankName,
  RankCount,
  COLORS,
} from "../components/insight/InsightComponent";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const ChartStyle = styled.div`
  width: 100%;
  height: 260px;
  @media screen and (max-width: 939px) {
    height: 180px;
  }
`;
const BoardInsightPage = () => {
  const { teamId, boardId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [radius, setRadius] = useState(getRadius(window.innerWidth));

  function getRadius(w) {
    if (w < 939) return 60; // 모바일 중간
    return 90; // PC
  }

  useEffect(() => {
    const handleResize = () => {
      setRadius(getRadius(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const boardName = location.state?.boardName || "";

  useBoardAutoAttendance(boardId);

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const [postTop5, setPostTop5] = useState([]);
  const [commentTop5, setCommentTop5] = useState([]);
  const [reactionTop5, setReactionTop5] = useState([]);

  /* 1) 팀원별 기여도 */

  useEffect(() => {
    if (!boardId) return;

    const fetchContribution = async () => {
      try {
        setLoading(true);
        const res = await AxiosApi.getBoardContribution(boardId);

        console.log("📌 board contribution =", res.data);

        const filteredMembers = (res.data || []).filter(
          (m) => m.role !== "PROFESSOR"
        );

        setMembers(res.data || []);
        console.log("Member data: ", members);
      } catch (e) {
        console.error("❌ 팀원 기여도 불러오기 실패", e);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContribution();
  }, [boardId]);

  /* 2) TOP5 */
  useEffect(() => {
    if (!boardId) return;

    const fetchTop5 = async () => {
      try {
        const [postRes, commentRes, reactionRes] = await Promise.all([
          AxiosApi.getPostTop5(boardId),
          AxiosApi.getCommentTop5(boardId),
          AxiosApi.getReactionTop5(boardId),
        ]);

        console.log("📌 postTop5 =", postRes.data);
        console.log("📌 commentTop5 =", commentRes.data);
        console.log("📌 reactionTop5 =", reactionRes.data);

        const postData = (postRes.data || []).filter(
          (item) => item.role !== "PROFESSOR"
        );
        const commentData = (commentRes.data || []).filter(
          (item) => item.role !== "PROFESSOR"
        );
        const reactionData = (reactionRes.data || []).filter(
          (item) => item.role !== "PROFESSOR"
        );

        setPostTop5(postRes.data || []);
        setCommentTop5(commentRes.data || []);
        setReactionTop5(reactionRes.data || []);
      } catch (e) {
        console.error("❌ TOP5 불러오기 실패", e);
        setPostTop5([]);
        setCommentTop5([]);
        setReactionTop5([]);
      }
    };

    fetchTop5();
  }, [boardId]);

  /* 3) 파이차트 데이터 */
  const pieData = useMemo(() => {
    if (!members.length) return [];
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

  /* 4) 팀원 상세 페이지로 이동 */
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    navigate(
      `/team/${teamId}/boards/${boardId}/insight/member/${member.userId}`,
      {
        state: { boardId, member },
      }
    );
  };

  /* 5) TOP5 카드 */
  const renderTop5Card = (title, list) => (
    <Card>
      <CardTitle>{title}</CardTitle>
      {list.length === 0 ? (
        <EmptyText>데이터가 없습니다.</EmptyText>
      ) : (
        <RankList>
          {list.map((item, idx) => (
            <RankItem key={item.userId}>
              <RankLeft>
                <RankNum>{idx + 1}</RankNum>
                <Avatar
                  src={
                    item?.userImage && item?.userImage.trim() !== ""
                      ? item?.userImage
                      : profileDefaultImg
                  }
                />
                <RankName>{item.userName}</RankName>
              </RankLeft>
              <RankCount>{item.count}</RankCount>
            </RankItem>
          ))}

          {/* 5위까지 자동 채우기 */}
          {list.length < 5 &&
            Array.from({ length: 5 - list.length }).map((_, i) => (
              <RankItem key={`empty-${i}`}>
                <RankLeft>
                  <RankNum>{list.length + i + 1}</RankNum>
                  <RankName>데이터가 존재하지 않습니다</RankName>
                </RankLeft>
              </RankItem>
            ))}
        </RankList>
      )}
    </Card>
  );

  return (
    <PageContainer>
      <Title>
        {" "}
        {boardName
          ? `${boardName} 프로젝트 인사이트`
          : `${boardId} 프로젝트 인사이트`}
      </Title>

      <Grid>
        {/* ⭐ 팀원별 활동 기여도 ⭐ */}
        <Card>
          <CardTitle>팀원별 활동 기여도</CardTitle>

          {loading ? (
            <EmptyText>불러오는 중...</EmptyText>
          ) : pieData.length === 0 ? (
            <EmptyText>데이터가 없습니다.</EmptyText>
          ) : (
            <>
              <ChartStyle>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={radius}
                      onClick={(_, idx) => handleMemberClick(members[idx])}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                          cursor="pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartStyle>

              <MemberList>
                {members.map((m, idx) => {
                  const percent =
                    totalScore > 0
                      ? ((m.contributionScore / totalScore) * 100).toFixed(1)
                      : 0;

                  const active = selectedMember?.userId === m.userId;

                  return (
                    <MemberItem
                      key={m.userId}
                      active={active}
                      onClick={() => handleMemberClick(m)}
                    >
                      <MemberLeft>
                        <Avatar
                          src={
                            m?.userImage && m?.userImage.trim() !== ""
                              ? m?.userImage
                              : profileDefaultImg
                          }
                        />
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

        {/* ⭐ TOP5 카드 3개 ⭐ */}
        {renderTop5Card("리포트 TOP5", postTop5)}
        {renderTop5Card("피드백 TOP5", commentTop5)}
        {renderTop5Card("리액션 TOP5", reactionTop5)}
      </Grid>
    </PageContainer>
  );
};

export default BoardInsightPage;
