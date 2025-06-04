import Layout from "@/components/Layout"
import ContributionHeatmap from "@/features/ContributionHeatmap"
import GithubLink from "@/features/GithubLink"
import LanguageGraphSection from "@/features/LanguageGraphSection"
import ProfileCardSection from "@/features/ProfileCardSection"
import QuickStats from "@/features/QuickStats"
import { RecentCommits } from "@/features/RecentCommits"
import ScoreCharacter from "@/features/ScoreCharacter"
import styled from "@emotion/styled"

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


export default function MyPage() {
  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            {/* Profile Header */}
            <ProfileCardSection />

          <ScoreCharacter />
            <ContentGrid>
              {/* Left Column */}
              <div>
                <LanguageGraphSection />
                {/* Contribution Heatmap */}
                <ContributionHeatmap />

                {/* Recent Commits */}
                <RecentCommits />
              </div>

              {/* Right Column */}
              <div>
                {/* Quick Stats */}
                <QuickStats />

                {/* GitHub Link */}
                <GithubLink />
              </div>
            </ContentGrid>
          </Container>
        </MainContent>
      </PageContainer>
      {/* Date Details Modal */}
    </Layout>
  )
}
