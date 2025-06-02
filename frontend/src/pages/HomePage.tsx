import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import Layout from "../components/Layout"

const PageContainer = styled.div`
  min-height: calc(100vh - 80px);
  background-color: #f9fafb;
`

const MainContent = styled.main`
  padding: 4rem 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const ContentWrapper = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
`

const Description = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 2rem;
`

const LoginButton = styled(Link)`
  display: inline-block;
  background-color: #4b5563;
  color: white;
  font-size: 1.125rem;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
  text-decoration: none;
  
  &:hover {
    background-color: #374151;
  }
`

const BottomSection = styled.div`
  background-color: #ecfdf5;
  padding: 4rem 0;
`

const BottomHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
`

const ProfileCircle = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #fde68a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const ProfileText = styled.span`
  color: #4b5563;
  font-weight: 500;
`

export default function HomePage() {
  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <ContentWrapper>
              <Description>
                GitRank는 개발자들이 자신의 GitHub 활동을 시각화하고, 친구들과의 개발
                <br />
                역량을 비교하며 서로 동기부여할 수 있는 플랫폼입니다.
                <br />
                커밋, PR, 스타 등 GitHub의 다양한 기여 지표를 기반으로 순위를 매기고, 한
                <br />
                눈에 자신의 개발 활동을 추적할 수 있습니다.
              </Description>

              <LoginButton to="/auth/github">Login GitHub</LoginButton>
            </ContentWrapper>
          </Container>
        </MainContent>

        <BottomSection>
          <Container>
            <BottomHeading>로그인하고 내 순위를 알아보세요</BottomHeading>
            <ProfileCircle>
              <ProfileText>민경</ProfileText>
            </ProfileCircle>
          </Container>
        </BottomSection>
      </PageContainer>
    </Layout>
  )
}
