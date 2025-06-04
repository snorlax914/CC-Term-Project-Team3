import userData from "@/utils/mock";
import styled from "@emotion/styled";
import { Calendar, LinkIcon, MapPin } from "lucide-react";

export const ProfileCardSection = () => {
  return (
    <ProfileCard>
      <ProfileCardContent>
        <ProfileAvatarWrapper>
          <ProfileAvatar src={userData.avatar_url || "/placeholder.svg"} alt={userData.name}/>
        </ProfileAvatarWrapper>

        <ProfileInfo>
          <ProfileHeader>
            <ProfileNameSection>
              <ProfileName>{userData.name}</ProfileName>
              <ProfileUsername>@{userData.login}</ProfileUsername>
            </ProfileNameSection>
          </ProfileHeader>

          <ProfileBio>{userData.bio}</ProfileBio>

          <ProfileMetaList>
            {userData.location && (
              <ProfileMetaItem>
                <MapPin size={16} />
                {userData.location}
              </ProfileMetaItem>
            )}
            {userData.blog && (
              <ProfileMetaItem>
                <LinkIcon size={16} />
                <ProfileLink href={userData.blog} target="_blank" rel="noopener noreferrer">
                  개인 블로그
                </ProfileLink>
              </ProfileMetaItem>
            )}
            <ProfileMetaItem>
              <Calendar size={16} />
              2020년부터 활동
            </ProfileMetaItem>
          </ProfileMetaList>

          <StatsGrid>
            <StatCard>
              <StatValue>{userData.score.toLocaleString()}</StatValue>
              <StatLabel>총 점수</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{userData.commits}</StatValue>
              <StatLabel>커밋</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{userData.PRs}</StatValue>
              <StatLabel>PR</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{userData.issue}</StatValue>
              <StatLabel>이슈</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{userData.contributes}</StatValue>
              <StatLabel>기여</StatLabel>
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

const ProfileBio = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const ProfileMetaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`

const ProfileMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const ProfileLink = styled.a`
  color: #2563eb;
  
  &:hover {
    text-decoration: underline;
  }
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