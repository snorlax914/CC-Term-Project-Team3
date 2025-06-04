import userData from "@/utils/mock";
import styled from "@emotion/styled";
import { Github } from "lucide-react";

export const GithubLink = () => {
  return (
    <GitHubCard>
      <GitHubIcon>
        <Github size={48} />
      </GitHubIcon>
      <GitHubTitle>GitHub 프로필</GitHubTitle>
      <GitHubDescription>GitHub에서 더 자세한 정보를 확인하세요</GitHubDescription>
      <GitHubButton href={`https://github.com/${userData.login}`} target="_blank" rel="noopener noreferrer">
        GitHub에서 보기
      </GitHubButton>
    </GitHubCard>
  );
}

export default GithubLink;

const GitHubCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`

const GitHubIcon = styled.div`
  margin: 0 auto 1rem;
  color: #374151;
`

const GitHubTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const GitHubDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`

const GitHubButton = styled.a`
  display: inline-block;
  width: 100%;
  background-color: #111827;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  
  &:hover {
    background-color: #1f2937;
  }
`