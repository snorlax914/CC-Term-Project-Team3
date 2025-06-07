"use client"

import { deleteFriend } from "@/api/friend"
import { friendsStore } from "@/stores/friendsStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { TIERS } from "@/types/tier"
import styled from "@emotion/styled"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Award,
  Crown,
  Eye,
  Filter,
  GitCommit,
  GitFork,
  Github,
  GitPullRequest,
  Grid,
  Inbox,
  List,
  Medal,
  Search,
  Star,
  Trophy,
  UserMinus,
  Users
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

interface Friend {
  id: number
  github_id: string
  login: string
  avatar_url: string
  html_url: string
  repos_count: number
  stars: number
  forks: number
  commit_count: number
  pulls: number
  issues: number
  score: number
}

// 정렬 기준 타입
type SortKey = "score" | "commit_count" | "stars" | "repos_count" | "pulls" | "issues" | "forks"

// 탭 타입
type TabKey = "all" | "ranking" | "activity" | "repos"

// 스타일 컴포넌트


const FriendsRankingPage = () => {
  const { friends, fetchFriends, loading } = friendsStore();
  const user = useAuthStore.getState().user;

  useEffect(() => {
    const getFriendsList = async () => {
      try {
        await fetchFriends();
      } catch (error) {
        console.error("친구 목록을 불러오는 중 오류 발생:", error);
      }
    };
  
    getFriendsList();
  }, [fetchFriends]);
  


  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [sortKey, setSortKey] = useState<SortKey>("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const navigate = useNavigate()

  const filteredAndSortedFriends = useMemo(() => {
    const filtered = friends.filter(
      (friend) =>
        friend.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.github_id.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey]
      const valueB = b[sortKey]

      if (sortDirection === "asc") {
        return valueA - valueB
      } else {
        return valueB - valueA
      }
    })
  }, [friends, searchQuery, sortKey, sortDirection])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const goToRequestPage = () => {
    navigate("/requests")
  }
  const renderStats = (friend: Friend, viewMode: "grid" | "list") => {
    switch (activeTab) {
      case "ranking":
        return (
          <StatsGrid viewMode={viewMode} columns={3}>
            <StatItem>
              <StatIcon>
                <Trophy size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.score)}</StatValue>
              <StatLabel>점수</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Star size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.stars)}</StatValue>
              <StatLabel>스타</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <GitFork size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.forks)}</StatValue>
              <StatLabel>포크</StatLabel>
            </StatItem>
          </StatsGrid>
        )
      case "activity":
        return (
          <StatsGrid viewMode={viewMode} columns={3}>
            <StatItem>
              <StatIcon>
                <GitCommit size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.commit_count)}</StatValue>
              <StatLabel>커밋</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <GitPullRequest size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.pulls)}</StatValue>
              <StatLabel>PR</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <AlertCircle size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.issues)}</StatValue>
              <StatLabel>이슈</StatLabel>
            </StatItem>
          </StatsGrid>
        )
      case "repos":
        return (
          <StatsGrid viewMode={viewMode} columns={3}>
            <StatItem>
              <StatIcon>
                <Github size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.repos_count)}</StatValue>
              <StatLabel>저장소</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Star size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.stars)}</StatValue>
              <StatLabel>스타</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <GitFork size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.forks)}</StatValue>
              <StatLabel>포크</StatLabel>
            </StatItem>
          </StatsGrid>
        )
      default:
        return (
          <StatsGrid viewMode={viewMode} columns={3}>
            <StatItem>
              <StatIcon>
                <Trophy size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.score)}</StatValue>
              <StatLabel>점수</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <GitCommit size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.commit_count)}</StatValue>
              <StatLabel>커밋</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Star size={14} />
              </StatIcon>
              <StatValue>{formatNumber(friend.stars)}</StatValue>
              <StatLabel>스타</StatLabel>
            </StatItem>
          </StatsGrid>
        )
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={12} />
      case 2:
        return <Medal size={12} />
      case 3:
        return <Award size={12} />
      default:
        if (rank <= 10) return <Trophy size={12} />
        return null
    }
  }

  const getTierEmoji = (score: number): string => {
    const matchedTier = TIERS.find(tier => score >= tier.minScore && score <= tier.maxScore);
    return matchedTier ? matchedTier.emoji : "❓"; // 혹시 모를 예외 대비
  };

  const handleRemoveFriend = async (friendId: number) => {
    const confirmDelete = window.confirm("정말로 이 친구를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    if (confirmDelete) {
      await deleteFriend(friendId)
      toast.success("친구가 삭제되었습니다.")
      await fetchFriends();
    }
  }

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <PageHeader>
              <div style={{ display: "flex", flexDirection: "column" }}>
              <PageTitle>
                <Users size={32} color="#3b82f6" />
                랭킹
              </PageTitle>
              <PageDescription>GitHub 친구들의 활동과 랭킹을 확인하고 비교해보세요</PageDescription>
              </div>
              <SettingsButton onClick={goToRequestPage}>
                <Inbox size={16} />
                <span>받은 요청 보기</span>
              </SettingsButton>
            </PageHeader>

            <ControlsSection>
              <SearchContainer>
                <SearchIcon>
                  <Search size={16} />
                </SearchIcon>
                <SearchInput
                  type="text"
                  placeholder="친구 이름으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchContainer>

              <ViewControls>
                <FriendsCount>
                  <Users size={16} />
                  <span>{filteredAndSortedFriends.length - 1}명의 친구</span>
                </FriendsCount>

                <ViewToggle>
                  <ViewButton active={viewMode === "grid"} onClick={() => setViewMode("grid")}>
                    <Grid size={16} />
                  </ViewButton>
                  <ViewButton active={viewMode === "list"} onClick={() => setViewMode("list")}>
                    <List size={16} />
                  </ViewButton>
                </ViewToggle>
              </ViewControls>
            </ControlsSection>

            <TabsContainer>
              <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
                <Users size={16} />
                전체 정보
              </Tab>
              <Tab active={activeTab === "ranking"} onClick={() => setActiveTab("ranking")}>
                <Trophy size={16} />
                랭킹
              </Tab>
              <Tab active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
                <GitCommit size={16} />
                활동 통계
              </Tab>
              <Tab active={activeTab === "repos"} onClick={() => setActiveTab("repos")}>
                <Github size={16} />
                저장소 통계
              </Tab>
            </TabsContainer>

            <SortContainer>
              <SortLabel>
                <Filter size={16} />
                정렬:
              </SortLabel>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <SortDropdown value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
                  <option value="score">점수</option>
                  <option value="commit_count">커밋 수</option>
                  <option value="stars">스타 수</option>
                  <option value="repos_count">저장소 수</option>
                  <option value="pulls">PR 수</option>
                  <option value="issues">이슈 수</option>
                  <option value="forks">포크 수</option>
                </SortDropdown>
                <SortDirectionButton
                  active={sortDirection === "desc"}
                  onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
                >
                  {sortDirection === "desc" ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                </SortDirectionButton>
              </div>
            </SortContainer>

            {filteredAndSortedFriends.length > 0 ? (
              <FriendsGrid viewMode={viewMode}>
                {filteredAndSortedFriends.map((friend, index) => {
                  return (
                    <FriendCard key={friend.id} viewMode={viewMode} style={{backgroundColor: friend.login !== user?.login ? "white" : "#f3f4f6", border: friend.login !== user?.login ? "1px solid #e5e7eb" : "1.5px solid #3b82f6"}}>
                      <RankBadge rank={index + 1}>
                        #{index + 1}
                        {getRankIcon(index + 1) && <RankIcon rank={index + 1}>{getRankIcon(index + 1)}</RankIcon>}
                      </RankBadge>

                      <CharacterAvatar tier={getTierEmoji(friend.score)}>{getTierEmoji(friend.score)}</CharacterAvatar>

                      <FriendCardContent viewMode={viewMode}>
                        <FriendAvatar src={friend.avatar_url} alt={friend.login} viewMode={viewMode} />

                        <FriendInfo viewMode={viewMode}>
                          <FriendName>{friend.login}</FriendName>
                          <FriendLogin>@{friend.login}</FriendLogin>
                          <ScoreBadge>
                            <Trophy size={12} />
                            {formatNumber(friend.score)} 점
                          </ScoreBadge>

                          {renderStats(friend, viewMode)}
                        </FriendInfo>

                        <ActionButtons viewMode={viewMode}>
                          <ViewProfileButton to={`/user/${friend.login}`}>
                            <Eye size={16} />
                            {viewMode === "grid" ? "프로필" : "보기"}
                          </ViewProfileButton>

                          {friend.login !== user?.login && (
                          <ActionButton variant="danger" onClick={() => handleRemoveFriend(friend.id)}>
                            <UserMinus size={16} />
                            {viewMode === "grid" ? "삭제" : ""}
                          </ActionButton>
                          )}
                        </ActionButtons>
                      </FriendCardContent>
                    </FriendCard>
                  )
                })}
              </FriendsGrid>
            ) : searchQuery ? (
              <EmptyState>
                <EmptyStateIcon>
                  <Search size={40} />
                </EmptyStateIcon>
                <EmptyStateTitle>검색 결과가 없습니다</EmptyStateTitle>
                <EmptyStateDescription>
                  "{searchQuery}"와 일치하는 친구를 찾을 수 없습니다. 다른 검색어를 시도해보세요.
                </EmptyStateDescription>
              </EmptyState>
            ) : (
              <EmptyState>
                <EmptyStateIcon>
                  <Users size={40} />
                </EmptyStateIcon>
                <EmptyStateTitle>아직 친구가 없습니다</EmptyStateTitle>
                <EmptyStateDescription>
                  다른 개발자들과 연결하여 함께 성장하고 협업해보세요. 검색 기능을 통해 새로운 친구를 찾아보세요.
                </EmptyStateDescription>
                <EmptyStateButton to="/search">
                  <Search size={16} />
                  친구 찾기
                </EmptyStateButton>
              </EmptyState>
            )}
          </Container>
        </MainContent>
      </PageContainer>
    </Layout>
  )
}

export default FriendsRankingPage

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
  display: flex;
  justify-content: space-between;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const PageDescription = styled.p`
  color: #6b7280;
  font-size: 1rem;
`

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 24rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ViewToggle = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.25rem;
`

const ViewButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#111827" : "#6b7280")};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) => (props.active ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none")};
  
  &:hover {
    color: #111827;
  }
`

const FriendsCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  color: ${(props) => (props.active ? "#111827" : "#6b7280")};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "#3b82f6" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${(props) => (props.active ? "#111827" : "#374151")};
  }
`

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const SortLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`

const SortDropdown = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`

const SortDirectionButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.active ? "#f3f4f6" : "white")};
  color: ${(props) => (props.active ? "#111827" : "#6b7280")};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`

const FriendsGrid = styled.div<{ viewMode: "grid" | "list" }>`
  display: grid;
  gap: 1.5rem;
  
  ${(props) =>
    props.viewMode === "grid"
      ? `
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  `
      : `
    grid-template-columns: 1fr;
  `}
`

const FriendCard = styled.div<{ viewMode: "grid" | "list" }>`
  position: relative;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: #3b82f6;
  }

  ${(props) =>
    props.viewMode === "list" &&
    `
    &:hover {
      transform: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `}
`


const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 3px solid white;
  
  ${(props) => {
    if (props.rank === 1)
      return `
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
        color: white;
        box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5);
        animation: pulse-gold 2s infinite;
      `
    if (props.rank === 2)
      return `
        background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%);
        color: #374151;
        box-shadow: 0 4px 20px rgba(156, 163, 175, 0.5);
      `
    if (props.rank === 3)
      return `
        background: linear-gradient(135deg, #fed7aa 0%, #fb923c 50%, #ea580c 100%);
        color: white;
        box-shadow: 0 4px 20px rgba(251, 146, 60, 0.5);
      `
    if (props.rank <= 10)
      return `
        background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 50%, #1d4ed8 100%);
        color: white;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
      `
    return `
      background: linear-gradient(135deg, #f3f4f6 0%, #6b7280 50%, #374151 100%);
      color: white;
      box-shadow: 0 4px 20px rgba(107, 114, 128, 0.3);
    `
  }}
  
  @keyframes pulse-gold {
    0% {
      box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5);
    }
    50% {
      box-shadow: 0 4px 25px rgba(251, 191, 36, 0.8);
    }
    100% {
      box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5);
    }
  }
`

const RankIcon = styled.div<{ rank: number }>`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  
  ${(props) => {
    if (props.rank === 1) return `color: #f59e0b;`
    if (props.rank === 2) return `color: #9ca3af;`
    if (props.rank === 3) return `color: #fb923c;`
    if (props.rank <= 10) return `color: #3b82f6;`
    return `color: #6b7280;`
  }}
`

const CharacterAvatar = styled.div<{ tier: string }>`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const FriendCardContent = styled.div<{ viewMode: "grid" | "list" }>`
  padding: 1.5rem;
  
  ${(props) =>
    props.viewMode === "grid"
      ? `
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
      : `
    display: flex;
    align-items: center;
    gap: 1rem;
  `}
`

const FriendAvatar = styled.img<{ viewMode: "grid" | "list" }>`
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
  transition: border-color 0.2s;

  ${(props) =>
    props.viewMode === "grid"
      ? `
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
  `
      : `
    width: 3.5rem;
    height: 3.5rem;
  `}
`


const FriendInfo = styled.div<{ viewMode: "grid" | "list" }>`
  ${(props) =>
    props.viewMode === "grid"
      ? `
    text-align: center;
    margin-bottom: 1rem;
    width: 100%;
  `
      : `
    flex: 1;
    min-width: 0;
  `}
`

const FriendName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`

const FriendLogin = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`

const ScoreBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`

const StatsGrid = styled.div<{ viewMode: "grid" | "list"; columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 3}, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  ${(props) =>
    props.viewMode === "list" &&
    `
    max-width: 400px;
  `}
`

const StatItem = styled.div`
  text-align: center;
  padding: 0.5rem;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
`

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  color: #6b7280;
`

const StatValue = styled.div`
  font-weight: 700;
  color: #111827;
  font-size: 0.875rem;
`

const StatLabel = styled.div`
  font-size: 0.625rem;
  color: #6b7280;
`

const ActionButtons = styled.div<{ viewMode: "grid" | "list" }>`
  display: flex;
  gap: 0.5rem;
  
  ${(props) =>
    props.viewMode === "grid"
      ? `
    justify-content: center;
    width: 100%;
  `
      : `
    flex-shrink: 0;
  `}
`

const ActionButton = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s;
  
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
          
          &:hover {
            background-color: #2563eb;
            border-color: #2563eb;
          }
        `
      case "danger":
        return `
          background-color: #ef4444;
          color: white;
          border-color: #ef4444;
          
          &:hover {
            background-color: #dc2626;
            border-color: #dc2626;
          }
        `
      default:
        return `
          background-color: white;
          color: #374151;
          border-color: #d1d5db;
          
          &:hover {
            background-color: #f9fafb;
            border-color: #9ca3af;
          }
        `
    }
  }}
`

const ViewProfileButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const EmptyStateIcon = styled.div`
  margin: 0 auto 1.5rem;
  width: 5rem;
  height: 5rem;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const EmptyStateDescription = styled.p`
  color: #6b7280;
  max-width: 28rem;
  margin: 0 auto 2rem;
`

const EmptyStateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
`
const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 50px;
  background-color: #e0f2fe;;
  border: 1px solid #38bdf8;
  color: #0369a1;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #bae6fd;
  }
`