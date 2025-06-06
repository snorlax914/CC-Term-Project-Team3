import { Commit } from "@/types/user";
import styled from "@emotion/styled";
import { Activity, Code, GitBranch } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";

interface RecentCommitsProps {
  commits: Commit[];
}

const formatRelativeTime = (dateString: string): string => {
  console.log("Formatting date:", dateString);
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime(); // 차이(ms)
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  return `${diffDay}일 전`;
};


export const RecentCommits = ({commits}: RecentCommitsProps) => {
  

  console.log("Recent commits:", commits);
  return (
    <Card>
      <CardHeader>
        <Activity size={20} />
        <div>
          <CardTitle>최근 커밋</CardTitle>
          <CardDescription>최근 커밋 활동 내역</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <CommitList>
          {commits.map((commit, index) => (
            <CommitCard key={index}>
              <CommitHeader>
                <CommitMessage>{commit.message}</CommitMessage>
                <CommitDate>{formatRelativeTime(commit.committedDate)}</CommitDate>
              </CommitHeader>
              <CommitMeta>
                <CommitRepo>
                  <Code size={14} />
                  {commit.repo}
                </CommitRepo>
                <CommitBranch>
                  <GitBranch size={14} />
                  {commit.branch}
                </CommitBranch>
                <CommitStats>
                  <CommitStat style={{ color: "#10b981" }}>+{commit.changedFilesIfAvailable}</CommitStat>
                  <CommitStat style={{ color: "#ef4444" }}>-{commit.deletions}</CommitStat>
                </CommitStats>
              </CommitMeta>
            </CommitCard>
          ))}
        </CommitList>
      </CardContent>
    </Card>
  );
}

export default RecentCommits;

const CommitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CommitCard = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  
  &:hover {
    background-color: #f9fafb;
  }
`

const CommitHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const CommitDate = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`

const CommitMessage = styled.p`
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`

const CommitMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  flex-wrap: wrap;
`

const CommitRepo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #2563eb;
`

const CommitBranch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
`

const CommitStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`

const CommitStat = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`