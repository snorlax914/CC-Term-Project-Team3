import { TierInfo, TIERS } from "@/types/tier";
import styled from "@emotion/styled";
import { AlertCircle, ChevronRight, GitCommit, GitFork, GitPullRequest, Info, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export const ScoreCharacter = ({score} : {score: number}) => {
  const [tier, setTier] = useState<TierInfo | null>(null);
  const [nextTier, setNextTier] = useState<TierInfo | null>(null);


  const getTierByScore = (score: number): TierInfo => {
    return TIERS.find(t => score >= t.minScore && score <= t.maxScore)!;
  };

  useEffect(() => {
    const currentTier = getTierByScore(score);
    setTier(currentTier);
  
    const currentIndex = TIERS.findIndex(t => t.name === currentTier.name);
    const next = TIERS[currentIndex + 1] ?? null;
    setNextTier(next);
  }, [score]);
  

  const tierProgress = () => {
    if (!tier) return "0%";
    const totalRange = tier?.maxScore - tier?.minScore
    const currentProgress = score - tier.minScore
    const percentage = Math.min(Math.max((currentProgress / totalRange) * 100, 0), 100)
    return `${percentage.toFixed(0)}%`
  }

  return (
     <ScoreCharacterSection>
     <ScoreCardContainer>
      <ScoreCardBackground />
      <ScoreHeader>
        <ScoreIcon>
          <Trophy size={24} />
        </ScoreIcon>
        <ScoreTitle>개발 점수</ScoreTitle>
      </ScoreHeader>

      <ScoreValue>{score.toLocaleString()}</ScoreValue>

      {/* 점수 계산 방식 설명 */}
      <ScoreExplanation>
        <ScoreExplanationHeader>
          <Info size={14} />
          <ScoreExplanationTitle>점수 계산 방식</ScoreExplanationTitle>
        </ScoreExplanationHeader>
        <ScoreExplanationText>
          커밋, PR, 이슈, 스타, 포크 수에 가중치를 적용한 점수를 기반으로 정규화한 결과입니다.
        </ScoreExplanationText>
        <ScoreFactors>
          <ScoreFactor>
            <FactorIcon>
              <GitCommit size={10} />
            </FactorIcon>
            <span>커밋</span>
          </ScoreFactor>
          <ScoreFactor>
            <FactorIcon>
              <GitPullRequest size={10} />
            </FactorIcon>
            <span>PR</span>
          </ScoreFactor>
          <ScoreFactor>
            <FactorIcon>
              <AlertCircle size={10} />
            </FactorIcon>
            <span>이슈</span>
          </ScoreFactor>
          <ScoreFactor>
            <FactorIcon>
              <Star size={10} />
            </FactorIcon>
            <span>스타</span>
          </ScoreFactor>
          <ScoreFactor>
            <FactorIcon>
              <GitFork size={10} />
            </FactorIcon>
            <span>포크</span>
          </ScoreFactor>
        </ScoreFactors>
      </ScoreExplanation>
    </ScoreCardContainer>

     {/* Character Card */}
     <CharacterCard>
       <CharacterCardBackground />
       <CharacterHeader>
         <CharacterTitle>내 캐릭터</CharacterTitle>
       </CharacterHeader>
       <CharacterAvatar>{tier?.emoji}</CharacterAvatar>
       <CharacterName>{tier?.name}</CharacterName>
       <CharacterDescription>{tier?.description}</CharacterDescription>
       <ProgressSection>
        <ProgressLabel textColor={tier?.color || "#000"}>
          <span>티어 진행도</span>
          <span>{tierProgress()}</span>
        </ProgressLabel>
        <ProgressBar bgColor={tier?.color || "#000"}>
          <ProgressFill width={tierProgress()} bgColor={tier?.color || "#000"} />
        </ProgressBar>
      </ProgressSection>

      {nextTier && (
        <NextTierSection bgColor={tier?.color || "#000"}>
          <NextTierInfo>
            <NextTierEmoji>{nextTier.emoji}</NextTierEmoji>
            <NextTierText>
              <NextTierName textColor={tier?.color || "#000"}>다음 티어: {nextTier?.name}</NextTierName>
              <NextTierScore textColor={tier?.color || "#000"}>필요 점수: {(nextTier?.minScore - score).toLocaleString()}</NextTierScore>
            </NextTierText>
          </NextTierInfo>
          <NextTierIcon textColor={tier?.color || "#000"}>
            <ChevronRight size={20} />
          </NextTierIcon>
        </NextTierSection>
      )}
     </CharacterCard>
   </ScoreCharacterSection>
  );
};

export default ScoreCharacter;

const ScoreCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
`

const ScoreCardBackground = styled.div`
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
`

const ScoreHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const ScoreIcon = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ScoreTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`

const ScoreValue = styled.div`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const ScoreExplanation = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const ScoreExplanationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const ScoreExplanationTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  opacity: 0.9;
`

const ScoreExplanationText = styled.p`
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0 0 0.75rem 0;
  opacity: 0.8;
`

const ScoreFactors = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.75rem;
`

const ScoreFactor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  opacity: 0.8;
`

const FactorIcon = styled.div`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
`

const CharacterName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #7c2d12;
  margin-bottom: 0.5rem;
`

const CharacterDescription = styled.p`
  color: #a16207;
  font-size: 0.875rem;
  line-height: 1.4;
`

const CharacterStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`

const ScoreCharacterSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const CharacterCard = styled.div`
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`

const CharacterCardBackground = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
`

const CharacterHeader = styled.div`
  margin-bottom: 1.5rem;
`

const CharacterTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #7c2d12;
  margin-bottom: 0.5rem;
`

const CharacterLevel = styled.div`
  display: inline-block;
  background-color: rgba(124, 45, 18, 0.1);
  color: #7c2d12;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
`

const CharacterAvatar = styled.div`
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border: 4px solid white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`

const ProgressLabel = styled.div<{ textColor: string }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.textColor};
`

const ProgressBar = styled.div<{ bgColor: string }>`
  background-color: ${(props) => `${props.bgColor}30`};
  border-radius: 9999px;
  height: 0.5rem;
  overflow: hidden;
`

const ProgressFill = styled.div<{ width: string; bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100%;
  width: ${(props) => props.width};
  border-radius: 9999px;
  transition: width 0.3s ease;
`

const NextTierSection = styled.div<{ bgColor: string }>`
  background-color: ${(props) => `${props.bgColor}15`};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => `${props.bgColor}30`};
`

const NextTierInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const NextTierEmoji = styled.div`
  font-size: 1.5rem;
`

const NextTierText = styled.div`
  text-align: left;
`

const NextTierName = styled.div<{ textColor: string }>`
  font-weight: 600;
  color: ${(props) => props.textColor};
  font-size: 0.875rem;
`

const NextTierScore = styled.div<{ textColor: string }>`
  color: ${(props) => `${props.textColor}CC`};
  font-size: 0.75rem;
`

const NextTierIcon = styled.div<{ textColor: string }>`
  color: ${(props) => props.textColor};
`