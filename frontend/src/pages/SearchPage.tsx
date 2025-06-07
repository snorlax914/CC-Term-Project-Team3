
import { searchUser, SearchUserResponse } from "@/api/friend";
import styled from "@emotion/styled";
import { Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchUserResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    try {
      const data = await searchUser(trimmed)
      setResults(data)
    } catch (err) {
      setError("검색 중 오류가 발생했습니다.")
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <ContentWrapper>
              <PageTitle>검색</PageTitle>

              <SearchForm onSubmit={handleSearch}>
                <SearchInputWrapper>
                  <Search size={20} color="#9ca3af" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                  <SearchInput
                    type="text"
                    placeholder="GitHub 사용자명을 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <SearchButton type="submit" disabled={!searchQuery.trim()}>
                    검색
                  </SearchButton>
                </SearchInputWrapper>
              </SearchForm>

              {loading && <p>로딩 중...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {results && (
                <>
                  <SectionTitle>검색 결과</SectionTitle>
                  {results.length > 0 ? (
                    <UserCardList>
                      {results.map((user, index) => (
                        <UserCard key={index}>
                          <UserCardContent to={`/user/${user.login}`}>
                            <UserAvatar src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
                            <UserInfo>
                              <UserName>{user.login}</UserName>
                              <UserUsername>@{user.login}</UserUsername>
                            </UserInfo>
                          </UserCardContent>
                        </UserCard>
                      ))}
                    </UserCardList>
                  ) : (
                    <p>검색 결과가 없습니다.</p>
                  )}
                </>
              )}
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
`

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 2rem;
`

const SearchForm = styled.form`
  margin-bottom: 3rem;
`

const SearchInputWrapper = styled.div`
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  
  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);
  }
`

const SearchButton = styled.button<{ disabled: boolean }>`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: ${(props) => (props.disabled ? "#d1d5db" : "#4b5563")};
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#d1d5db" : "#374151")};
  }
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`

const UserCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const UserCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const UserCardContent = styled(Link)`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
`

const UserAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.h3`
  font-weight: 600;
  color: #111827;
`

const UserUsername = styled.p`
  color: #6b7280;
  `;