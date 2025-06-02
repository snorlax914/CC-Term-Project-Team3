"use client"

import styled from "@emotion/styled"
import { Activity, Award, Calendar, Code, Github, LinkIcon, MapPin, Settings, Star } from "lucide-react"
import Layout from "../components/Layout"

// Styled Components
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
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 3px solid #3b82f6;
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

const ProfileAvatarWrapper = styled.div`
  position: relative;
  align-self: center;
  
  @media (min-width: 768px) {
    align-self: flex-start;
  }
`

const ProfileAvatar = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 4px solid #dbeafe;
`

const RankBadge = styled.div`
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  background-color: #10b981;
  color: white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid white;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const ProfileNameSection = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileName = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
`

const ProfileUsername = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
`

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #e5e7eb;
  }
`

const ProfileBio = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const ProfileMetaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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

const RepoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RepoCard = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  
  &:hover {
    background-color: #f9fafb;
  }
`

const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 0.5rem;
`

const RepoName = styled.h3`
  font-weight: 600;
  color: #2563eb;
  font-size: 1.125rem;
`

const RepoDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
`

const RepoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
`

const RepoLanguage = styled.span`
  display: inline-block;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #4b5563;
`

const RepoStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
`

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`

const AchievementCard = styled.div`
  text-align: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  
  &:hover {
    background-color: #f9fafb;
  }
`

const AchievementIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

const AchievementTitle = styled.h4`
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
`

const AchievementDescription = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`

const QuickStatsCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const QuickStatsTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`

const QuickStatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const QuickStatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const QuickStatLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`

const QuickStatValue = styled.span`
  font-weight: 700;
  color: #111827;
`

const RankBadgeInline = styled.span`
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
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

export default function MyPage() {
  // Mock user data - 실제로는 로그인된 사용자 데이터
  const userData = {
    login: "myusername",
    name: "김개발",
    avatar_url: "/placeholder.svg?height=120&width=120",
    bio: "풀스택 개발자입니다. React, Node.js, Python을 주로 사용하며 오픈소스 기여를 좋아합니다.",
    location: "서울, 대한민국",
    blog: "https://myblog.dev",
    public_repos: 42,
    followers: 1234,
    following: 567,
    rank: 156,
    score: 45678,
    stats: {
      totalStars: 2847,
      totalForks: 892,
      totalCommits: 3456,
      contributedRepos: 89,
      streak: 45,
    },
    achievements: [
      { name: "Early Adopter", description: "GitHub 초기 사용자", icon: "🏆" },
      { name: "Star Gazer", description: "1000개 이상 스타 획득", icon: "⭐" },
      { name: "Collaborator", description: "50개 이상 저장소 기여", icon: "🤝" },
      { name: "Commit Master", description: "1000회 이상 커밋", icon: "💻" },
    ],
    recentRepos: [
      {
        name: "awesome-project",
        description: "멋진 프로젝트입니다. React와 TypeScript로 구현된 모던 웹 애플리케이션",
        stars: 234,
        language: "TypeScript",
      },
      {
        name: "react-components",
        description: "재사용 가능한 React 컴포넌트 라이브러리",
        stars: 156,
        language: "JavaScript",
      },
      { name: "python-utils", description: "유용한 Python 유틸리티 모음", stars: 89, language: "Python" },
    ],
  }

  // GitHub-style contribution heatmap
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
            {/* Profile Header */}
            <ProfileCard>
              <ProfileCardContent>
                <ProfileAvatarWrapper>
                  <ProfileAvatar src={userData.avatar_url || "/placeholder.svg"} alt={userData.name} />
                  <RankBadge>#{userData.rank}</RankBadge>
                </ProfileAvatarWrapper>

                <ProfileInfo>
                  <ProfileHeader>
                    <ProfileNameSection>
                      <ProfileName>{userData.name}</ProfileName>
                      <ProfileUsername>@{userData.login}</ProfileUsername>
                    </ProfileNameSection>
                    <SettingsButton>
                      <Settings size={16} />
                      설정
                    </SettingsButton>
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
                          개인 블로그
                        </ProfileLink>
                      </ProfileMetaItem>
                    )}
                    <ProfileMetaItem>
                      <Calendar size={16} />
                      2020년부터 활동
                    </ProfileMetaItem>
                  </ProfileMetaList>

                  <StatsGrid>
                    <StatCard>
                      <StatValue>{userData.score.toLocaleString()}</StatValue>
                      <StatLabel>총 점수</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userData.followers}</StatValue>
                      <StatLabel>팔로워</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userData.public_repos}</StatValue>
                      <StatLabel>저장소</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userData.stats.totalStars}</StatValue>
                      <StatLabel>총 스타</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userData.stats.streak}</StatValue>
                      <StatLabel>연속 기여</StatLabel>
                    </StatCard>
                  </StatsGrid>
                </ProfileInfo>
              </ProfileCardContent>
            </ProfileCard>

            <ContentGrid>
              {/* Left Column */}
              <div>
                {/* Contribution Heatmap */}
                <Card>
                  <CardHeader>
                    <Activity size={20} />
                    <div>
                      <CardTitle>일별 활동</CardTitle>
                      <CardDescription>지난 1년간의 기여 활동</CardDescription>
                    </div>
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

                {/* Recent Repositories */}
                <Card>
                  <CardHeader>
                    <Code size={20} />
                    <div>
                      <CardTitle>최근 저장소</CardTitle>
                      <CardDescription>최근에 업데이트한 저장소들</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RepoList>
                      {userData.recentRepos.map((repo, index) => (
                        <RepoCard key={index}>
                          <RepoHeader>
                            <RepoName>{repo.name}</RepoName>
                          </RepoHeader>
                          <RepoDescription>{repo.description}</RepoDescription>
                          <RepoMeta>
                            <RepoLanguage>{repo.language}</RepoLanguage>
                            <RepoStat>
                              <Star size={14} />
                              {repo.stars}
                            </RepoStat>
                            <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>2일 전 업데이트</span>
                          </RepoMeta>
                        </RepoCard>
                      ))}
                    </RepoList>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div>
                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <Award size={20} />
                    <div>
                      <CardTitle>업적</CardTitle>
                      <CardDescription>획득한 업적들</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AchievementGrid>
                      {userData.achievements.map((achievement, index) => (
                        <AchievementCard key={index}>
                          <AchievementIcon>{achievement.icon}</AchievementIcon>
                          <AchievementTitle>{achievement.name}</AchievementTitle>
                          <AchievementDescription>{achievement.description}</AchievementDescription>
                        </AchievementCard>
                      ))}
                    </AchievementGrid>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <QuickStatsCard>
                  <QuickStatsTitle>상세 통계</QuickStatsTitle>
                  <QuickStatsList>
                    <QuickStatItem>
                      <QuickStatLabel>총 커밋</QuickStatLabel>
                      <QuickStatValue>{userData.stats.totalCommits.toLocaleString()}</QuickStatValue>
                    </QuickStatItem>
                    <QuickStatItem>
                      <QuickStatLabel>총 포크</QuickStatLabel>
                      <QuickStatValue>{userData.stats.totalForks.toLocaleString()}</QuickStatValue>
                    </QuickStatItem>
                    <QuickStatItem>
                      <QuickStatLabel>기여 저장소</QuickStatLabel>
                      <QuickStatValue>{userData.stats.contributedRepos}</QuickStatValue>
                    </QuickStatItem>
                    <QuickStatItem>
                      <QuickStatLabel>현재 랭킹</QuickStatLabel>
                      <RankBadgeInline>#{userData.rank}</RankBadgeInline>
                    </QuickStatItem>
                  </QuickStatsList>
                </QuickStatsCard>

                {/* GitHub Link */}
                <GitHubCard>
                  <GitHubIcon>
                    <Github size={48} />
                  </GitHubIcon>
                  <GitHubTitle>GitHub 프로필</GitHubTitle>
                  <GitHubDescription>GitHub에서 더 자세한 정보를 확인하세요</GitHubDescription>
                  <GitHubButton href={`https://github.com/${userData.login}`} target="_blank" rel="noopener noreferrer">
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
