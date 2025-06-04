import userData from "@/utils/mock";
import styled from "@emotion/styled";
import { Trophy } from "lucide-react";

export const ScoreCharacter = () => {
  return (
     <ScoreCharacterSection>
     <ScoreCard>
       <ScoreCardBackground />
       <ScoreHeader>
         <ScoreIcon>
           <Trophy size={24} />
         </ScoreIcon>
         <ScoreTitle>내 총 점수</ScoreTitle>
       </ScoreHeader>
       <ScoreValue>{userData.score.toLocaleString()}</ScoreValue>
       <ScoreProgress>
       </ScoreProgress>
     </ScoreCard>

     {/* Character Card */}
     <CharacterCard>
       <CharacterCardBackground />
       <CharacterHeader>
         <CharacterTitle>내 캐릭터</CharacterTitle>
         <CharacterLevel>Level {userData.character.level}</CharacterLevel>
       </CharacterHeader>
       <CharacterAvatar>{userData.character.emoji}</CharacterAvatar>
       <CharacterName>{userData.character.name}</CharacterName>
       <CharacterDescription>{userData.character.description}</CharacterDescription>
       <CharacterStats>
           
       </CharacterStats>
     </CharacterCard>
   </ScoreCharacterSection>
  );
};

export default ScoreCharacter;

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

const ScoreCard = styled.div`
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
  margin-bottom: 1.5rem;
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

const ScoreProgress = styled.div`
  margin-top: 1.5rem;
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