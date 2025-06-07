import { sendFriendRequest } from "@/api/friend";
import { userData } from "@/utils/mock";
import styled from "@emotion/styled";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  avatarUrl: string;
  id?: number;
  name: string;
  githubId: string;
  stars: number;
  forks: number;
  commits: number;
  issues: number;
  pulls: number;
  friendshipStatus?: "pending" | "accepted" | "null";
};

export const ProfileCardSection = ({
  avatarUrl,
  id,
  name,
  githubId,
  stars,
  forks,
  commits,
  issues,
  pulls,
  friendshipStatus = "null"
}: ProfileCardProps) => {

  const [text, setText] = useState<string>("친구 추가");
  const [disabled, setDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const makeText = () => {
    if (friendshipStatus === "pending") {
      setText("대기 중");
      setDisabled(true);
    } else if (friendshipStatus === "accepted") {
      setText("친구");
      setDisabled(true);
    }
  };

  useEffect(() => {
    makeText();
  }, [friendshipStatus]);



  const handleFriendRequest = async () => {
    if (!id) {
      toast.error("유효하지 않은 사용자 ID입니다.");
      return;
    }
      try {
      await sendFriendRequest(id?.toLocaleString());
      toast.success("친구 요청을 보냈습니다!");
      navigate(0);
      return;
      } catch (error) {
        console.error("Error sending friend request:", error);
        toast.error("친구 요청에 실패했습니다.");
      }
  }

  console.log(friendshipStatus);

  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileAvatarWrapper>
          <ProfileAvatar src={avatarUrl || "/placeholder.svg"} alt={userData.name}/>
        </ProfileAvatarWrapper>

        <ProfileInfo>
          <ProfileHeader>
            <ProfileNameSection>
              <ProfileName>{name}</ProfileName>
              <ProfileUsername>@{githubId}</ProfileUsername>
            </ProfileNameSection>
            { friendshipStatus !== "null" ? (
            <SettingsButton onClick={handleFriendRequest} disabled={disabled}>
              <UserPlus size={16} />
              <span>{text}</span>
            </SettingsButton>
            ) : null
          }
          </ProfileHeader>


          <StatsGrid>
            <StatCard>
              <StatValue>{forks}</StatValue>
              <StatLabel>포크</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{commits}</StatValue>
              <StatLabel>커밋</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{pulls}</StatValue>
              <StatLabel>PR</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{issues}</StatValue>
              <StatLabel>이슈</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stars}</StatValue>
              <StatLabel>스타</StatLabel>
            </StatCard>
          </StatsGrid>
        </ProfileInfo>
      </ProfileCardContent>
    </ProfileCard>
  );
}

export default ProfileCardSection;

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

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #d1fae5;
  border: 1px solid #6ee7b7;
  color: #047857;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #a7f3d0;
  }
`

const ProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #dbeafe;
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