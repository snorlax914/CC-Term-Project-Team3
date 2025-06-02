"use client"

import { useParams } from "react-router-dom"
import { Star, GitFork, Users, MapPin, LinkIcon, Calendar, Activity, Github } from "lucide-react"
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

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const ProfileCardContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const ProfileAvatar = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 4px solid #d1fae5;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`

const ProfileName = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
`

const ProfileBadge = styled.span`
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`

const ProfileBio = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
`

const ProfileMetaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`

const ProfileMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const ProfileLink = styled.a`
  color: #2563eb;
  
  &:hover {
    text-decoration: underline;
  }
`

const ProfileStats = styled.div`
  display: flex;
  gap: 1.5rem;
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`

const CardContent = styled.div`
  padding: 1.5rem;
`

const HeatmapContainer = styled.div`
  overflow-x: auto;
`

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 0.25rem;
  min-width: 800px;
`

const HeatmapCell = styled.div<{ intensity: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.125rem;
  background-color: ${(props) => props.intensity};
`

const HeatmapLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`

const HeatmapLegendColors = styled.div`
  display: flex;
  gap: 0.25rem;
`

const LanguageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LanguageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LanguageColor = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

const LanguageName = styled.span`
  font-weight: 500;
  color: #111827;
`

const LanguageStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ProgressBar = styled.div`
  width: 6rem;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ width: string; color: string }>`
  height: 100%;
  border-radius: 9999px;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`

const PercentageText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  width: 2.5rem;
  text-align: right;
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  
  &:hover {
    background-color: #f9fafb;
  }
`

const ActivityIcon = styled.div`
  color: #059669;
  margin-top: 0.125rem;
`

const ActivityContent = styled.div`
  flex: 1;
`

const ActivityMessage = styled.p`
  font-weight: 500;
  color: #111827;
`

const ActivityRepo = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`

const ActivityTime = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
`

const StatIcon = styled.div<{ color: string }>`
  margin: 0 auto 0.5rem;
  color: ${(props) => props.color};
`

const GitHubCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`

const GitHubIcon = styled.div`
  margin: 0 auto 1rem;
  color: #374151;
`

const GitHubTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const GitHubDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`

const GitHubButton = styled.a`
  display: inline-block;
  width: 100%;
  background-color: #111827;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  
  &:hover {
    background-color: #1f2937;
  }
`

// Mock data
const mockUserData = {
  login: "github_user",
  name: "GitHub User",
  avatar_url: "/placeholder.svg?height=120&width=120",
  bio: "Full-stack developer passionate about open source",
  location: "Seoul, Korea",
  blog: "https://example.com",
  public_repos: 42,
  followers: 1234,
  following: 567,
  created_at: "2018-01-01",
  stats: {
    totalStars: 2847,
    totalForks: 892,
    totalCommits: 3456,
    contributedRepos: 89,
  },
  languages: [
    { name: "JavaScript", percentage: 35, color: "#f1e05a" },
    { name: "Python", percentage: 28, color: "#3572A5" },
    { name: "TypeScript", percentage: 20, color: "#2b7489" },
    { name: "Java", percentage: 12, color: "#b07219" },
    { name: "Go", percentage: 5, color: "#00ADD8" },
  ],
  recentActivity: [
    { type: "commit", repo: "awesome-project", message: "Fix bug in authentication", date: "2시간 전" },
    { type: "star", repo: "react", message: "Starred repository", date: "5시간 전" },
    { type: "fork", repo: "next.js", message: "Forked repository", date: "1일 전" },
    { type: "pr", repo: "typescript", message: "Opened pull request", date: "2일 전" },
  ],
}

export default function UserPage() {
  const { username } = useParams<{ username: string }>()
  const userData = mockUserData

  // GitHub-style contribution heatmap data
  const generateHeatmapData = () => {
    const data = []
    const today = new Date()
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const contributions = Math.floor(Math.random() * 10)
      data.push({
        date: date.toISOString().split("T")[0],
        count: contributions,
      })
    }
    return data
  }

  const heatmapData = generateHeatmapData()

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "#f3f4f6"
    if (count <= 2) return "#a7f3d0"
    if (count <= 4) return "#6ee7b7"
    if (count <= 6) return "#34d399"
    return "#10b981"
  }

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            {/* User Profile Header */}
            <ProfileCard>
              <ProfileCardContent>
                <ProfileAvatar src={userData.avatar_url || "/placeholder.svg"} alt={userData.name} />

                <ProfileInfo>
                  <ProfileHeader>
                    <ProfileName>{userData.name}</ProfileName>
                    <ProfileBadge>@{username}</ProfileBadge>
                  </ProfileHeader>

                  <ProfileBio>{userData.bio}</ProfileBio>

                  <ProfileMetaList>
                    {userData.location && (
                      <ProfileMetaItem>
                        <MapPin size={16} />
                        {userData.location}
                      </ProfileMetaItem>
                    )}
                    {userData.blog && (
                      <ProfileMetaItem>
                        <LinkIcon size={16} />
                        <ProfileLink href={userData.blog} target="_blank" rel="noopener noreferrer">
                          웹사이트
                        </ProfileLink>
                      </ProfileMetaItem>
                    )}
                    <ProfileMetaItem>
                      <Calendar size={16} />
                      {new Date(userData.created_at).getFullYear()}년부터 활동
                    </ProfileMetaItem>
                  </ProfileMetaList>

                  <ProfileStats>
                    <StatItem>
                      <StatValue>{userData.followers}</StatValue>
                      <StatLabel>팔로워</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatValue>{userData.following}</StatValue>
                      <StatLabel>팔로잉</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatValue>{userData.public_repos}</StatValue>
                      <StatLabel>저장소</StatLabel>
                    </StatItem>
                  </ProfileStats>
                </ProfileInfo>
              </ProfileCardContent>
            </ProfileCard>

            <ContentGrid>
              {/* Left Column */}
              <div>
                {/* Contribution Heatmap */}
                <Card>
                  <CardHeader>
                    <CardTitle>활동 히트맵</CardTitle>
                    <CardDescription>지난 1년간의 기여 활동</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HeatmapContainer>
                      <HeatmapGrid>
                        {heatmapData.map((day, index) => (
                          <HeatmapCell
                            key={index}
                            intensity={getHeatmapColor(day.count)}
                            title={`${day.date}: ${day.count} contributions`}
                          />
                        ))}
                      </HeatmapGrid>
                      <HeatmapLegend>
                        <span>Less</span>
                        <HeatmapLegendColors>
                          <HeatmapCell intensity="#f3f4f6" />
                          <HeatmapCell intensity="#a7f3d0" />
                          <HeatmapCell intensity="#6ee7b7" />
                          <HeatmapCell intensity="#34d399" />
                          <HeatmapCell intensity="#10b981" />
                        </HeatmapLegendColors>
                        <span>More</span>
                      </HeatmapLegend>
                    </HeatmapContainer>
                  </CardContent>
                </Card>

                {/* Language Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>언어 사용 통계</CardTitle>
                    <CardDescription>가장 많이 사용하는 프로그래밍 언어</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LanguageList>
                      {userData.languages.map((lang, index) => (
                        <LanguageItem key={index}>
                          <LanguageInfo>
                            <LanguageColor color={lang.color} />
                            <LanguageName>{lang.name}</LanguageName>
                          </LanguageInfo>
                          <LanguageStats>
                            <ProgressBar>
                              <ProgressFill width={`${lang.percentage}%`} color={lang.color} />
                            </ProgressBar>
                            <PercentageText>{lang.percentage}%</PercentageText>
                          </LanguageStats>
                        </LanguageItem>
                      ))}
                    </LanguageList>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>최근 활동</CardTitle>
                    <CardDescription>최근 GitHub 활동 내역</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityList>
                      {userData.recentActivity.map((activity, index) => (
                        <ActivityItem key={index}>
                          <ActivityIcon>
                            <Activity size={20} />
                          </ActivityIcon>
                          <ActivityContent>
                            <ActivityMessage>{activity.message}</ActivityMessage>
                            <ActivityRepo>{activity.repo}</ActivityRepo>
                          </ActivityContent>
                          <ActivityTime>{activity.date}</ActivityTime>
                        </ActivityItem>
                      ))}
                    </ActivityList>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div>
                {/* Stats Cards */}
                <StatsGrid>
                  <StatCard>
                    <StatIcon color="#eab308">
                      <Star size={32} />
                    </StatIcon>
                    <StatValue>{userData.stats.totalStars}</StatValue>
                    <StatLabel>총 스타</StatLabel>
                  </StatCard>

                  <StatCard>
                    <StatIcon color="#3b82f6">
                      <GitFork size={32} />
                    </StatIcon>
                    <StatValue>{userData.stats.totalForks}</StatValue>
                    <StatLabel>총 포크</StatLabel>
                  </StatCard>

                  <StatCard>
                    <StatIcon color="#4b5563">
                      <Github size={32} />
                    </StatIcon>
                    <StatValue>{userData.stats.totalCommits}</StatValue>
                    <StatLabel>총 커밋</StatLabel>
                  </StatCard>

                  <StatCard>
                    <StatIcon color="#10b981">
                      <Users size={32} />
                    </StatIcon>
                    <StatValue>{userData.stats.contributedRepos}</StatValue>
                    <StatLabel>기여 저장소</StatLabel>
                  </StatCard>
                </StatsGrid>

                {/* GitHub Profile Link */}
                <GitHubCard>
                  <GitHubIcon>
                    <Github size={48} />
                  </GitHubIcon>
                  <GitHubTitle>GitHub 프로필</GitHubTitle>
                  <GitHubDescription>더 자세한 정보는 GitHub에서 확인하세요</GitHubDescription>
                  <GitHubButton href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                    GitHub에서 보기
                  </GitHubButton>
                </GitHubCard>
              </div>
            </ContentGrid>
          </Container>
        </MainContent>
      </PageContainer>
    </Layout>
  )
}
