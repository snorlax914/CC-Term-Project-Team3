"use client"

import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import type React from "react"
import { useEffect, useState } from "react"

// 데이터 타입 정의
interface Language {
  color: string
  name: string
  size: number
}

interface LanguageStatsData {
  commits?: number
  forks?: number
  issues?: number
  languages: Language[]
}

interface LanguageGraphProps {
  data: LanguageStatsData
  showStats?: boolean
  compact?: boolean
}

// styled.div에서 compact 같은 커스텀 prop이 DOM에 전달되지 않도록 설정
const GraphContainer = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "compact",
})<{ compact?: boolean }>`
  margin-bottom: ${(props) => (props.compact ? "0.5rem" : "1.5rem")};
`

const LanguageBar = styled.div`
  display: flex;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`

const LanguageSegment = styled.div<{ bgColor: string; width: string }>`
  height: 100%;
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width};
  transition: width 0.3s ease;
`

const LanguageList = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "compact",
})<{ compact?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => (props.compact ? "0.5rem" : "1rem")};
  margin-top: ${(props) => (props.compact ? "0.5rem" : "1rem")};
`

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LanguageColor = styled.div<{ bgColor: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`

const LanguageName = styled.span`
  font-weight: 500;
  color: #374151;
`

const LanguagePercentage = styled("span", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "compact",
})<{ compact?: boolean }>`
  font-size: ${(props) => (props.compact ? "0.75rem" : "0.875rem")};
  color: #6b7280;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`

const StatItem = styled.div`
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`

const LanguageGraph: React.FC<LanguageGraphProps> = ({ data, showStats = true, compact = false }) => {
  const [processedLanguages, setProcessedLanguages] = useState<Array<Language & { percentage: number }>>([])

  useEffect(() => {
    if (data.languages && data.languages.length > 0) {
      const totalSize = data.languages.reduce((sum, lang) => sum + lang.size, 0)
      const processed = data.languages
        .map((lang) => ({
          ...lang,
          percentage: (lang.size / totalSize) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage)

      setProcessedLanguages(processed)
    }
  }, [data])

  return (
    <GraphContainer compact={compact}>
      {showStats && data.commits !== undefined && (
        <StatsContainer>
          <StatItem>
            <StatValue>{data.commits.toLocaleString()}</StatValue>
            <StatLabel>커밋</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{data.forks?.toLocaleString() || 0}</StatValue>
            <StatLabel>포크</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{data.issues?.toLocaleString() || 0}</StatValue>
            <StatLabel>이슈</StatLabel>
          </StatItem>
        </StatsContainer>
      )}

      <LanguageBar>
        {processedLanguages.map((lang, index) => (
          <LanguageSegment
            key={index}
            bgColor={lang.color}
            width={`${lang.percentage}%`}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
          />
        ))}
      </LanguageBar>

      <LanguageList compact={compact}>
        {processedLanguages.slice(0, compact ? 5 : undefined).map((lang, index) => (
          <LanguageItem key={index}>
            <LanguageColor bgColor={lang.color} />
            <LanguageName>{lang.name}</LanguageName>
            <LanguagePercentage compact={compact}>
              {lang.percentage.toFixed(1)}%
            </LanguagePercentage>
          </LanguageItem>
        ))}
      </LanguageList>
    </GraphContainer>
  )
}

export default LanguageGraph
