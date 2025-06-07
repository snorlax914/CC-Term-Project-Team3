"use client"

import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { Activity, BarChart3, CheckCircle, GitCommit, GitFork, Github, Loader2, Star, Trophy, User } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

interface MyPageLoadingScreenProps {
  isLoading: boolean
  onComplete?: () => void
}

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const progressWave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const dataFlow = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-40px) scale(0.8);
    opacity: 0;
  }
`

// 스타일 컴포넌트
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  color: white;
`

const LogoSection = styled.div`
  position: relative;
  margin-bottom: 2rem;
`

const LogoBackground = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`

const LogoIcon = styled.div`
  position: relative;
`

const ChartIcon = styled.div`
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 4px;
  color: #667eea;
`

const LoadingSpinner = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border: 3px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  animation: ${slideUp} 0.6s ease-out;
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  animation: ${slideUp} 0.6s ease-out 0.1s backwards;
`

const LoadingStepsContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const LoadingStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${(props) =>
    props.completed
      ? "rgba(16, 185, 129, 0.2)"
      : props.active
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(255, 255, 255, 0.1)"};
  border-radius: 0.75rem;
  border: 1px solid ${(props) =>
    props.completed
      ? "rgba(16, 185, 129, 0.4)"
      : props.active
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(255, 255, 255, 0.2)"};
  transition: all 0.3s ease;
  animation: ${(props) => (props.active ? slideUp : "none")} 0.5s ease-out;
`

const StepIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: ${(props) =>
    props.completed
      ? "rgba(16, 185, 129, 0.3)"
      : props.active
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(255, 255, 255, 0.1)"};
  border: 2px solid ${(props) =>
    props.completed
      ? "rgba(16, 185, 129, 0.6)"
      : props.active
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(255, 255, 255, 0.3)"};
  
  ${(props) =>
    props.active &&
    `
    animation: ${pulse} 2s infinite;
  `}
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const StepDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`

const StepProgress = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`

const StepProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 1) 100%);
  width: ${(props) => props.progress}%;
  border-radius: 2px;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
    animation: ${progressWave} 2s infinite;
  }
`

const DataVisualization = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`

const DataPoint = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${dataFlow} 3s infinite;
  animation-delay: ${(props) => props.delay}s;
`

const DataIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const DataLabel = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
`

const ProgressSummary = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`

const ProgressTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ProgressStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`

const ProgressStat = styled.div`
  text-align: center;
`

const ProgressStatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`

const ProgressStatLabel = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
`

const UserPageLoadingScreen: React.FC<MyPageLoadingScreenProps> = ({ isLoading, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const loadingSteps = [
    {
      id: 0,
      title: "GitHub 프로필 정보 가져오는 중",
      description: "사용자 기본 정보, 팔로워, 팔로잉 데이터를 불러오고 있습니다",
      icon: <User size={24} />,
      duration: 2000,
    },
    {
      id: 1,
      title: "저장소 데이터 분석 중",
      description: "공개 저장소, 커밋 히스토리, 언어 사용량을 분석하고 있습니다",
      icon: <Github size={24} />,
      duration: 3000,
    },
    {
      id: 2,
      title: "활동 통계 계산 중",
      description: "커밋, 이슈, PR 데이터를 기반으로 활동 점수를 계산하고 있습니다",
      icon: <Activity size={24} />,
      duration: 2500,
    },
    {
      id: 3,
      title: "랭킹 및 티어 결정 중",
      description: "다른 개발자들과 비교하여 랭킹과 티어를 결정하고 있습니다",
      icon: <Trophy size={24} />,
      duration: 2000,
    },
    {
      id: 4,
      title: "대시보드 준비 완료",
      description: "모든 데이터 처리가 완료되었습니다",
      icon: <CheckCircle size={24} />,
      duration: 1000,
    },
  ]

  useEffect(() => {
    if (!isLoading) return

    let stepTimer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const startStep = (stepIndex: number) => {
      if (stepIndex >= loadingSteps.length) {
        if (onComplete) onComplete()
        return
      }

      setCurrentStep(stepIndex)
      setStepProgress(0)

      const step = loadingSteps[stepIndex]
      const progressInterval = step.duration / 100

      progressTimer = setInterval(() => {
        setStepProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            setCompletedSteps((prev) => [...prev, stepIndex])

            stepTimer = setTimeout(() => {
              startStep(stepIndex + 1)
            }, 500)

            return 100
          }
          return prev + 2
        })
      }, progressInterval)
    }

    startStep(0)

    return () => {
      clearTimeout(stepTimer)
      clearInterval(progressTimer)
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <LoadingOverlay>
      <LoadingContainer>
        <LogoSection>
          <LogoBackground>
            <LoadingSpinner />
            <LogoIcon>
              <Github size={48} color="white" />
              <ChartIcon>
                <BarChart3 size={24} />
              </ChartIcon>
            </LogoIcon>
          </LogoBackground>
        </LogoSection>

        <Title>마이페이지 로딩 중</Title>
        <Subtitle>GitHub 데이터를 분석하여 개인화된 대시보드를 준비하고 있습니다</Subtitle>

        <DataVisualization>
          <DataPoint delay={0}>
            <DataIcon>
              <GitCommit size={20} />
            </DataIcon>
            <DataLabel>커밋</DataLabel>
          </DataPoint>
          <DataPoint delay={0.5}>
            <DataIcon>
              <Star size={20} />
            </DataIcon>
            <DataLabel>스타</DataLabel>
          </DataPoint>
          <DataPoint delay={1}>
            <DataIcon>
              <GitFork size={20} />
            </DataIcon>
            <DataLabel>포크</DataLabel>
          </DataPoint>
          <DataPoint delay={1.5}>
            <DataIcon>
              <BarChart3 size={20} />
            </DataIcon>
            <DataLabel>통계</DataLabel>
          </DataPoint>
        </DataVisualization>

        <LoadingStepsContainer>
          {loadingSteps.map((step, index) => (
            <LoadingStep key={step.id} active={currentStep === index} completed={completedSteps.includes(index)}>
              <StepIcon active={currentStep === index} completed={completedSteps.includes(index)}>
                {completedSteps.includes(index) ? (
                  <CheckCircle size={24} />
                ) : currentStep === index ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  step.icon
                )}
              </StepIcon>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
                {currentStep === index && (
                  <StepProgress>
                    <StepProgressFill progress={stepProgress} />
                  </StepProgress>
                )}
              </StepContent>
            </LoadingStep>
          ))}
        </LoadingStepsContainer>

        <ProgressSummary>
          <ProgressTitle>
            <Activity size={20} />
            데이터 처리 현황
          </ProgressTitle>
          <ProgressStats>
            <ProgressStat>
              <ProgressStatValue>{completedSteps.length}</ProgressStatValue>
              <ProgressStatLabel>완료된 단계</ProgressStatLabel>
            </ProgressStat>
            <ProgressStat>
              <ProgressStatValue>{Math.round(stepProgress)}%</ProgressStatValue>
              <ProgressStatLabel>현재 진행률</ProgressStatLabel>
            </ProgressStat>
            <ProgressStat>
              <ProgressStatValue>{loadingSteps.length}</ProgressStatValue>
              <ProgressStatLabel>전체 단계</ProgressStatLabel>
            </ProgressStat>
          </ProgressStats>
        </ProgressSummary>
      </LoadingContainer>
    </LoadingOverlay>
  )
}

export default UserPageLoadingScreen
