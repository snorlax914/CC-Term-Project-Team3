import { acceptFriendRequest, rejectFriendRequest } from "@/api/friend"
import { friendsStore } from "@/stores/friendsStore"
import styled from "@emotion/styled"
import { Check, UserPlus, X } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

const ReceivedRequestsPage = () => {
  // 상태 관리
  const { requests, fetchFriends } = friendsStore.getState(); 
  const navigate = useNavigate();

  // 요청 수락 처리
  const handleAccept = async (requestId: number) => {
    try {
      await acceptFriendRequest(requestId.toString())
      toast.success("친구 요청을 수락했습니다!")
      await fetchFriends() // 친구 목록 갱신
      navigate(0);
    }
    catch (error) {
      console.error("Error accepting friend request:", error)
      toast.error("친구 요청 수락에 실패했습니다.")
    }
  }

  const handleReject = async (requestId: number) => {
    try {
      await rejectFriendRequest(requestId.toString())
      toast.success("친구 요청을 거절했습니다!")
      await fetchFriends()
      navigate(0);
    }
    catch (error) {
      console.error("Error rejecting friend request:", error)
      toast.error("친구 요청 거절에 실패했습니다.")
    }
  }

  const totalCount = requests.length

  return (
    <Layout>
      <PageContainer>
        <MainContent>
          <Container>
            <PageHeader>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <PageTitle>받은 친구 요청</PageTitle>
                <PageDescription>다른 개발자들이 보낸 친구 요청을 확인해보세요!</PageDescription>
              </div>
              <StatsBar>
                <StatItem>
                  <StatValue>{totalCount}</StatValue>
                  <StatLabel>요청</StatLabel>
                </StatItem>
              </StatsBar>
            </PageHeader>


            {requests.length > 0 ? (
              <RequestGrid>
                {requests.map((request) => (
                  <RequestCard key={request.request_id} status={request.status}>
                    <StatusBadge status={request.status}>
                      {request.status === "pending"
                      ? "대기 중"
                      : request.status === "accepted"
                      ? "수락됨"
                      : request.status === "rejected"
                      ? "거절됨"
                      : ""}
                      </StatusBadge>

                    <CardHeader>
                      <UserAvatar src={request.from_user.avatar_url} alt={request.from_user.login} />
                      <UserName>{request.from_user.login}</UserName>
                    </CardHeader>
                    <CardContent>

                      {request.status === "pending" ? (
                        <ActionButtons>
                          <AcceptButton onClick={() => handleAccept(request.request_id)}>
                            <Check size={16} />
                            수락
                          </AcceptButton>
                          <RejectButton onClick={() => handleReject(request.request_id)}>
                            <X size={16} />
                            거절
                          </RejectButton>
                        </ActionButtons>
                      ) : (
                        <ActionButtons>
                          <AcceptButton disabled>{request.status === "accepted" ? "수락됨" : "거절됨"}</AcceptButton>
                        </ActionButtons>
                      )}
                    </CardContent>
                  </RequestCard>
                ))}
              </RequestGrid>
            ) : (
              <EmptyState>
                <EmptyStateIcon>
                  <UserPlus size={40} />
                </EmptyStateIcon>
                <EmptyStateTitle>받은 친구 요청이 없습니다</EmptyStateTitle>
                <EmptyStateDescription>
                  다른 개발자들이 보낸 친구 요청이 여기에 표시됩니다. 더 많은 개발자들과 네트워킹하려면 랭킹 페이지나
                  검색 기능을 활용해보세요.
                </EmptyStateDescription>
              </EmptyState>
            )}
          </Container>
        </MainContent>
      </PageContainer>
    </Layout>
  )
}

export default ReceivedRequestsPage

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

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`

const PageDescription = styled.p`
  color: #6b7280;
  font-size: 1rem;
`

const StatsBar = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`

const RequestGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const RequestCard = styled.div<{ status: string }>`
  background-color: white;
  position: relative;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.2s;
  border: 2px solid ${(props) => {
    if (props.status === "accepted") return "#10b981"
    if (props.status === "rejected") return "#ef4444"
    return "transparent"
  }};
  opacity: ${(props) => (props.status === "pending" ? 1 : 0.7)};
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
  text-align: center;
  margin-bottom: 1rem;
`

const UserAvatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  border: 3px solid #e5e7eb;
`

const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`

const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const AcceptButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.disabled ? "#d1d5db" : "#10b981")};
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#d1d5db" : "#059669")};
  }
`

const RejectButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.disabled ? "#d1d5db" : "#f3f4f6")};
  color: ${(props) => (props.disabled ? "#9ca3af" : "#4b5563")};
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#d1d5db" : "#e5e7eb")};
    color: ${(props) => (props.disabled ? "#9ca3af" : "#1f2937")};
  }
`

const StatusBadge = styled.div<{ status: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${(props) => {
    if (props.status === "accepted") {
      return `
        background-color: #dcfce7;
        color: #166534;
      `
    }
    if (props.status === "rejected") {
      return `
        background-color: #fecaca;
        color: #dc2626;
      `
    }
    return `
      background-color: #fef3c7;
      color: #d97706;
    `
  }}
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const EmptyStateIcon = styled.div`
  margin: 0 auto 1.5rem;
  width: 5rem;
  height: 5rem;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const EmptyStateDescription = styled.p`
  color: #6b7280;
  max-width: 28rem;
  margin: 0 auto;
`
