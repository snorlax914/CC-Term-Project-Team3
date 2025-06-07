import { isValidToken } from "@/utils/token"
import styled from "@emotion/styled"
import { BarChart3, Github } from "lucide-react"
import { type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
`

const LogoIconWrapper = styled.div`
  position: relative;
`

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${(props) => (props.$active ? "#111827" : "#4b5563")};
  font-weight: ${(props) => (props.$active ? "500" : "400")};
  transition: color 0.2s;
  text-decoration: none;
  
  &:hover {
    color: #111827;
  }
`

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isValid = isValidToken();

  return (
    <div>
      <Header>
        <Container>
          <HeaderContent>
            <LogoContainer to="/">
              <LogoIconWrapper>
                <Github size={40} color="#1f2937" />
                <BarChart3
                  size={20}
                  color="#4b5563"
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                  }}
                />
              </LogoIconWrapper>
              <LogoText>GitRank</LogoText>
            </LogoContainer>

            { isValid && 
            <Navigation>
              <NavLink to="/my-page" $active={location.pathname === "/my-page"}>
                마이페이지
              </NavLink>
              <NavLink to="/search" $active={location.pathname === "/search"}>
                친구 검색
              </NavLink>
              <NavLink to="/friends" $active={location.pathname === "/friends"}>
                친구
              </NavLink>
            </Navigation>
          }
          </HeaderContent>
        </Container>
      </Header>
      {children}
    </div>
  )
}
