import { LanguageStat } from "@/api/stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import styled from "@emotion/styled";

interface LanguageStatWithPercentage extends LanguageStat {
  percentage: number;
}

const getTopLanguagesWithPercentage = (
  languages: LanguageStat[],
): LanguageStatWithPercentage[] => {
  const sorted = [...languages].sort((a, b) => b.size - a.size);
  const top = sorted.slice(0, 5);
  const total = top.reduce((sum, lang) => sum + lang.size, 0);

  return top.map((lang) => ({
    ...lang,
    percentage: total === 0 ? 0 : parseFloat(((lang.size / total) * 100).toFixed(1)),
  }));
};

export const LanguageGraphSection = ({ languages }: { languages: LanguageStat[] })=> {

  const topLanguages: LanguageStatWithPercentage[] = getTopLanguagesWithPercentage(languages);
  console.log("Top Languages with Percentage:", languages);
  return (
    <Card>
      <CardHeader>
        <CardTitle>언어 사용 통계</CardTitle>
        <CardDescription>가장 많이 사용하는 프로그래밍 언어</CardDescription>
      </CardHeader>
      <CardContent>
        <LanguageList>
          {topLanguages.map((lang, index) => (
            <LanguageItem key={index}>
              <LanguageInfo>
                <LanguageColor color={lang.color} />
                <LanguageName>{lang.name}</LanguageName>
              </LanguageInfo>
              <LanguageStats>
                <ProgressBar>
                  <ProgressFill width={`${lang.percentage}%`} color={lang.color} />
                </ProgressBar>
                <PercentageText>{lang.percentage}%</PercentageText>
              </LanguageStats>
            </LanguageItem>
          ))}
        </LanguageList>
      </CardContent>
    </Card>
  );
}
export default LanguageGraphSection;

const LanguageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LanguageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LanguageColor = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

const LanguageName = styled.span`
  font-weight: 500;
  color: #111827;
`

const LanguageStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ProgressBar = styled.div`
  width: 6rem;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ width: string; color: string }>`
  height: 100%;
  border-radius: 9999px;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`

const PercentageText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  width: 2.5rem;
  text-align: right;
`