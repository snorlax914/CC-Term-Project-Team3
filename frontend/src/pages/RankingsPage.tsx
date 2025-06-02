"use client"

import { useState } from "react"
import { Trophy, Star, Users, TrendingUp, Medal, Award } from "lucide-react"
import styled from "@emotion/styled"
import Layout from "../components/Layout"

const PageContainer = styled.div`
  min-height: calc(100vh - 80px);
  background-color: #f9fafb;
`

const MainContent = styled.main`
  padding: 2rem 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`

const PageDescription = styled.p`
  color: #6b7280;
`

const TabsContainer = styled.div`
  margin-bottom: 1.5rem;
`

const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #f3f4f6;
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
`

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#111827" : "#6b7280")};
  font-weight: ${(props) => (props.active ? "500" : "400")};
  font-size: 0.875rem;
  cursor: pointer;
  box-shadow: ${(props) => (props.active ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none")};
  
  &:hover {
    color: ${(props) => (props.active ? "#111827" : "#4b5563")};
  }
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`

const CardContent = styled.div`
  padding: 1.5rem;
`

const PodiumContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const PodiumItem = styled.div<{ rank: number }>`
  text-align: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: ${(props) => {
    if (props.rank === 1) return "linear-gradient(to bottom, #fef9c3, #fef08a)"
    if (props.rank === 2) return "linear-gradient(to bottom, #f3f4f6, #e5e7eb)"
    return "linear-gradient(to bottom, #fed7aa, #fdba74)"
  }};
  border: 2px solid ${(props) => {
    if (props.rank === 1) return "#fde047"
    if (props.rank === 2) return "#d1d5db"
    return "#fb923c"
  }};
`

const RankIcon = styled.div`
  margin-bottom: 1rem;
`

const UserAvatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: 0 auto 1rem;
  border: 4px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const UserName = styled.h3`
  font-weight: 700;
  font-size: 1.125rem;
  color: #111827;
`

const UserUsername = styled.p`
  color: #4b5563;
  margin-bottom: 0.5rem;
`

const UserBadge = styled.span`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #4b5563;
  margin-bottom: 0.75rem;
`

const UserScore = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
`

const UserScoreLabel = styled.div`
  font-size: 0.75rem;
  color: #4b5563;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
`

const EmptyStateIcon = styled.div`
  color: #9ca3af;
  margin-bottom: 1rem;
`

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
`

const EmptyStateDescription = styled.p`
  color: #9ca3af;
`

const topDevelopers = [
  {
    rank: 1,
    username: "torvalds",
    name: "Linus Torvalds",
    avatar: "/placeholder.svg?height=50&width=50",
    score: 98542,
    stars: 45231,
    repos: 89,
    followers: 156789,
    badge: "Linux Creator",
  },
  {
    rank: 2,
    username: "gaearon",
    name: "Dan Abramov",
    avatar: "/placeholder.svg?height=50&width=50",
    score: 87231,
    stars: 38942,
    repos: 67,
    followers: 98765,
    badge: "React Core",
  },
  {
    rank: 3,
    username: "sindresorhus",
    name: "Sindre Sorhus",
    avatar: "/placeholder.svg?height=50&width=50",
    score: 76890,
    stars: 42156,
    repos: 234,
    followers: 87654,
    badge: "Open Source",
  },
]

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState("developers")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} color="#eab308" />
      case 2:
        return <Medal size={24} color="#9ca3af" />
      case 3:
        return <Award size={24} color="#d97706" />
      default:
        return <span style={{ fontWeight: "bold" }}>{rank}</span>
    }
  }

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <PageHeader>
              <PageTitle>개발자 랭킹</PageTitle>
              <PageDescription>GitHub 활동을 기반으로 한 개발자 순위</PageDescription>
            </PageHeader>

            <TabsContainer>
              <TabsList>
                <TabButton active={activeTab === "developers"} onClick={() => setActiveTab("developers")}>
                  <Users size={16} />
                  개발자 랭킹
                </TabButton>
                <TabButton active={activeTab === "repositories"} onClick={() => setActiveTab("repositories")}>
                  <Star size={16} />
                  인기 저장소
                </TabButton>
                <TabButton active={activeTab === "trending"} onClick={() => setActiveTab("trending")}>
                  <TrendingUp size={16} />
                  트렌딩
                </TabButton>
              </TabsList>

              {activeTab === "developers" && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Trophy size={20} color="#eab308" />
                      상위 3명
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PodiumContainer>
                      {topDevelopers.map((dev) => (
                        <PodiumItem key={dev.rank} rank={dev.rank}>
                          <RankIcon>{getRankIcon(dev.rank)}</RankIcon>
                          <UserAvatar src={dev.avatar || "/placeholder.svg"} alt={dev.name} />
                          <UserName>{dev.name}</UserName>
                          <UserUsername>@{dev.username}</UserUsername>
                          <UserBadge>{dev.badge}</UserBadge>
                          <UserScore>{dev.score.toLocaleString()}</UserScore>
                          <UserScoreLabel>점수</UserScoreLabel>
                        </PodiumItem>
                      ))}
                    </PodiumContainer>
                  </CardContent>
                </Card>
              )}

              {activeTab === "repositories" && (
                <Card>
                  <CardHeader>
                    <CardTitle>인기 저장소</CardTitle>
                    <CardDescription>스타 수 기준 인기 저장소</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmptyState>
                      <EmptyStateIcon>
                        <Star size={64} />
                      </EmptyStateIcon>
                      <EmptyStateTitle>저장소 데이터 준비 중</EmptyStateTitle>
                      <EmptyStateDescription>곧 인기 저장소 랭킹을 확인할 수 있습니다.</EmptyStateDescription>
                    </EmptyState>
                  </CardContent>
                </Card>
              )}

              {activeTab === "trending" && (
                <Card>
                  <CardHeader>
                    <CardTitle>트렌딩</CardTitle>
                    <CardDescription>이번 주 가장 인기 있는 프로젝트</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmptyState>
                      <EmptyStateIcon>
                        <TrendingUp size={64} />
                      </EmptyStateIcon>
                      <EmptyStateTitle>트렌딩 데이터 준비 중</EmptyStateTitle>
                      <EmptyStateDescription>곧 이번 주 트렌딩 프로젝트를 확인할 수 있습니다.</EmptyStateDescription>
                    </EmptyState>
                  </CardContent>
                </Card>
              )}
            </TabsContainer>
          </Container>
        </MainContent>
      </PageContainer>
    </Layout>
  )
}
