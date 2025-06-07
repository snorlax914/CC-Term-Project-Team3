import { login } from "@/api/auth";
import { friendsStore } from "@/stores/friendsStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useStatsStore } from "@/stores/userStats";
import { isValidToken } from "@/utils/token";
import styled from "@emotion/styled";
import { useState } from "react";
import Layout from "../components/Layout";


export default function HomePage() {
  const [isValid, setIsValid] = useState(isValidToken());


  const handleLogin = async () => {
    const res = await login();
    const { oauth_url, state } = res;
    console.log("OAuth URL:", oauth_url);
    localStorage.setItem("oauth_state", state);
    localStorage.setItem("url", oauth_url);
    window.location.href = oauth_url;
    setIsValid(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("friends-storage");
    localStorage.removeItem("auth-storage");
    friendsStore.getState().clearFriends(); // 친구 목록 + 요청 초기화
    useStatsStore.getState().clearStats(); // 내 통계 초기화
    useAuthStore.getState().logout();
    window.location.href = "/home";
    setIsValid(false);
  };
  
  
    
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

              {!isValid ? <LoginButton onClick={handleLogin}>Login With GitHub</LoginButton> : <LoginButton onClick={handleLogout}>Logout</LoginButton>}
            </ContentWrapper>
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

const LoginButton = styled.button`
  display: inline-block;
  background-color: #4b5563;
  color: white;
  font-size: 1.125rem;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
  text-decoration: none;
  cursor: pointer;
  border: none;
  
  &:hover {
    background-color: #374151;
  }
`
