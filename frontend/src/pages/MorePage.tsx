import { Link } from "react-router-dom"
import { HelpCircle, Settings, Info, Mail, Shield } from "lucide-react"
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
`

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 2rem;
`

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MenuCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const MenuCardContent = styled(Link)`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
`

const MenuIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuTitle = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
  color: #111827;
`

const MenuDescription = styled.p`
  color: #6b7280;
`

const Footer = styled.div`
  margin-top: 3rem;
  text-align: center;
  color: #9ca3af;
`

const FooterText = styled.p`
  margin-bottom: 0.5rem;
`

export default function MorePage() {
  const menuItems = [
    {
      icon: Settings,
      title: "설정",
      description: "계정 및 알림 설정",
      href: "/settings",
    },
    {
      icon: HelpCircle,
      title: "도움말",
      description: "GitRank 사용법 및 FAQ",
      href: "/help",
    },
    {
      icon: Info,
      title: "서비스 소개",
      description: "GitRank에 대해 자세히 알아보기",
      href: "/about",
    },
    {
      icon: Mail,
      title: "문의하기",
      description: "궁금한 점이나 건의사항",
      href: "/contact",
    },
    {
      icon: Shield,
      title: "개인정보처리방침",
      description: "개인정보 보호 정책",
      href: "/privacy",
    },
  ]

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <ContentWrapper>
              <PageTitle>기타</PageTitle>

              <MenuList>
                {menuItems.map((item, index) => (
                  <MenuCard key={index}>
                    <MenuCardContent to={item.href}>
                      <MenuIcon>
                        <item.icon size={24} color="#6b7280" />
                      </MenuIcon>
                      <MenuInfo>
                        <MenuTitle>{item.title}</MenuTitle>
                        <MenuDescription>{item.description}</MenuDescription>
                      </MenuInfo>
                    </MenuCardContent>
                  </MenuCard>
                ))}
              </MenuList>

              <Footer>
                <FooterText>GitRank v1.0.0</FooterText>
                <FooterText>© 2024 GitRank. All rights reserved.</FooterText>
              </Footer>
            </ContentWrapper>
          </Container>
        </MainContent>
      </PageContainer>
    </Layout>
  )
}
