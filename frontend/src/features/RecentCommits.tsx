import userData from "@/utils/mock";
import styled from "@emotion/styled";
import { Activity, Code, GitBranch } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";

export const RecentCommits = () => {
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
          {userData.recentCommits.map((commit, index) => (
            <CommitCard key={index}>
              <CommitHeader>
                <CommitSha>{commit.sha}</CommitSha>
                <CommitDate>{commit.date}</CommitDate>
              </CommitHeader>
              <CommitMessage>{commit.message}</CommitMessage>
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
                  <CommitStat style={{ color: "#10b981" }}>+{commit.additions}</CommitStat>
                  <CommitStat style={{ color: "#ef4444" }}>-{commit.deletions}</CommitStat>
                  <CommitStat style={{ color: "#6b7280" }}>{commit.files} files</CommitStat>
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

const CommitSha = styled.code`
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #4b5563;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  margin-right: auto;
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