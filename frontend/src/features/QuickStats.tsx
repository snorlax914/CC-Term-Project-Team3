import { userData } from "@/utils/mock";
import styled from "@emotion/styled";

export const QuickStats = () => {
  return (
    <QuickStatsCard>
                  <QuickStatsTitle>상세 통계</QuickStatsTitle>
                  <QuickStatsList>
                    <QuickStatItem>
                      <QuickStatLabel>총 커밋</QuickStatLabel>
                      <QuickStatValue>{userData.stats.totalCommits.toLocaleString()}</QuickStatValue>
                    </QuickStatItem>
                    <QuickStatItem>
                      <QuickStatLabel>총 포크</QuickStatLabel>
                      <QuickStatValue>{userData.stats.totalForks.toLocaleString()}</QuickStatValue>
                    </QuickStatItem>
                    <QuickStatItem>
                      <QuickStatLabel>기여 저장소</QuickStatLabel>
                      <QuickStatValue>{userData.stats.contributedRepos}</QuickStatValue>
                    </QuickStatItem>
                  </QuickStatsList>
                </QuickStatsCard>
  );
}

export default QuickStats;

const QuickStatsCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
`

const QuickStatsTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`

const QuickStatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const QuickStatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const QuickStatLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`

const QuickStatValue = styled.span`
  font-weight: 700;
  color: #111827;
`