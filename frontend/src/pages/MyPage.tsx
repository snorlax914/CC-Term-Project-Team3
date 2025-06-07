import Layout from "@/components/Layout";
import ContributionHeatmap from "@/features/ContributionHeatmap";
import GithubLink from "@/features/GithubLink";
import LanguageGraphSection from "@/features/LanguageGraphSection";
import ProfileCardSection from "@/features/ProfileCardSection";
import { RecentCommits } from "@/features/RecentCommits";
import ScoreCharacter from "@/features/ScoreCharacter";
import UserPageLoadingScreen from "@/features/UserPageLoadingScreen";
import { useAuthStore } from "@/stores/useAuthStore";
import { useStatsStore } from "@/stores/userStats";
import styled from "@emotion/styled";
import { useEffect } from "react";

export default function MyPage() {
  const { userStats, fetchUserStats, loading, error } = useStatsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.login) {
      fetchUserStats(user.login);
    }
  }, [user?.login]);

  if (loading) return <UserPageLoadingScreen isLoading={true} />;
  if (error) return <div>{error}</div>;
  if (!userStats) return <div>데이터 없음</div>;

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
