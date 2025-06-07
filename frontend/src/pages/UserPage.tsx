import { getUserStats } from "@/api/stats"; // ✅ 실제 API 함수 import
import Layout from "@/components/Layout";
import ContributionHeatmap from "@/features/ContributionHeatmap";
import GithubLink from "@/features/GithubLink";
import LanguageGraphSection from "@/features/LanguageGraphSection";
import ProfileCardSection from "@/features/ProfileCardSection";
import { RecentCommits } from "@/features/RecentCommits";
import ScoreCharacter from "@/features/ScoreCharacter";
import UserPageLoadingScreen from "@/features/UserPageLoadingScreen";
import { User } from "@/types/user";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MyPage() {
  const [userStats, setUserStats] = useState<User | null>(null);
  const { username } = useParams();

  useEffect(() => {
    if (!username) return;

    const fetchStats = async () => {
      try {
        const data = await getUserStats(username);
        setUserStats(data);
      } catch {
        setUserStats(null);
      }
    };

    fetchStats();
  }, [username]);

  if (!userStats) return <UserPageLoadingScreen isLoading={true} />;

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <ProfileCardSection 
              name={userStats.login}
              avatarUrl={userStats.avatar_url}
              githubId={userStats.github_id}
              commits={userStats.commit_count}
              pulls={userStats.pulls}
              issues={userStats.issues}
              stars={userStats.stars}
              forks={userStats.forks}
              friendshipStatus={userStats.friendship_status}
              id={userStats.id}
            />

            <ScoreCharacter score={userStats.score} />

            <ContentGrid>
              <div>
                <LanguageGraphSection languages={userStats.languages} />
                <ContributionHeatmap contributions={userStats.contributions} />
                <RecentCommits commits={userStats.commits} />
              </div>
              <div>
                <GithubLink url={userStats.html_url} />
              </div>
            </ContentGrid>
          </Container>
        </MainContent>
      </PageContainer>
    </Layout>
  )
}

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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`
