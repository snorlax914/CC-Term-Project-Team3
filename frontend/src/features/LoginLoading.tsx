"use client"

import type React from "react"

import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { BarChart3, CheckCircle, Github, Lock, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface LoginLoadingScreenProps {
  isLoading: boolean
  status?: "success" | "error" | "loading"
  message?: string
  errorMessage?: string
  onComplete?: () => void
}

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
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
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`

// 스타일 컴포넌트
const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  backdrop-filter: blur(5px);
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  text-align: center;
`

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`

const LogoBackground = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f0f9ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
`

const LogoIcon = styled.div`
  position: relative;
`

const ChartIcon = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  color: #3b82f6;
`

const LoadingSpinner = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid transparent;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  animation: ${slideUp} 0.5s ease-out;
`

const Message = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  animation: ${slideUp} 0.5s ease-out 0.1s backwards;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 2rem;
`

const ProgressFill = styled.div<{ status?: string }>`
  height: 100%;
  background-color: ${(props) => {
    if (props.status === "success") return "#10b981"
    if (props.status === "error") return "#ef4444"
    return "#3b82f6"
  }};
  animation: ${progressAnimation} 2s ease-in-out forwards;
`

const StatusIcon = styled.div<{ status: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  ${(props) => {
    if (props.status === "success") {
      return `
        color: #10b981;
        background-color: #d1fae5;
      `
    }
    if (props.status === "error") {
      return `
        color: #ef4444;
        background-color: #fee2e2;
      `
    }
    return `
      color: #3b82f6;
      background-color: #dbeafe;
    `
  }}
`

const StatusMessage = styled.p<{ status: string }>`
  font-weight: 500;
  margin-bottom: 0.5rem;
  
  ${(props) => {
    if (props.status === "success") {
      return `color: #10b981;`
    }
    if (props.status === "error") {
      return `color: #ef4444;`
    }
    return `color: #3b82f6;`
  }}
`

const ErrorDetails = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`

const LoadingSteps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`

const LoadingStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  width: 100%;
  opacity: ${(props) => (props.active || props.completed ? 1 : 0.5)};
  transition: opacity 0.3s ease;
`

const StepIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 0.75rem;
  
  ${(props) => {
    if (props.completed) {
      return `
        background-color: #10b981;
        color: white;
      `
    }
    if (props.active) {
      return `
        background-color: #3b82f6;
        color: white;
      `
    }
    return `
      background-color: #e5e7eb;
      color: #6b7280;
    `
  }}
`

const StepText = styled.span<{ active: boolean; completed: boolean }>`
  font-size: 0.875rem;
  
  ${(props) => {
    if (props.completed) {
      return `
        color: #10b981;
        text-decoration: line-through;
      `
    }
    if (props.active) {
      return `color: #111827; font-weight: 500;`
    }
    return `color: #6b7280;`
  }}
`

const StepProgress = styled.div`
  flex: 1;
  height: 2px;
  background-color: #e5e7eb;
  margin: 0 0.5rem;
  position: relative;
`

const StepProgressFill = styled.div<{ progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #3b82f6;
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`

const LoginLoadingScreen: React.FC<LoginLoadingScreenProps> = ({
  isLoading,
  status = "loading",
  message = "GitHub 계정으로 로그인 중입니다...",
  errorMessage = "인증 과정에서 문제가 발생했습니다. 다시 시도해 주세요.",
  onComplete,
}) => {
  const [visible, setVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  const steps = ["GitHub 인증 요청 중", "사용자 정보 가져오는 중", "저장소 데이터 분석 중", "프로필 생성 중"]

  useEffect(() => {
    if (isLoading) {
      setVisible(true)

      // 로딩 단계 시뮬레이션
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(stepInterval)
            return prev
          }
          return prev + 1
        })
        setStepProgress(0)
      }, 2000)

      // 각 단계 내 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        setStepProgress((prev) => {
          if (prev >= 100) return 0
          return prev + 5
        })
      }, 100)

      return () => {
        clearInterval(stepInterval)
        clearInterval(progressInterval)
      }
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isLoading, steps.length])

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        if (onComplete) onComplete()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [status, onComplete])

  if (!visible) return null

  return (
    <Overlay isVisible={isLoading}>
      <LoadingContainer>
        <LogoContainer>
          <LogoBackground>
            {status === "loading" && <LoadingSpinner />}
            <LogoIcon>
              <Github size={40} color="#1f2937" />
              <ChartIcon>
                <BarChart3 size={20} color="#3b82f6" />
              </ChartIcon>
            </LogoIcon>
          </LogoBackground>
        </LogoContainer>

        {status === "loading" && (
          <>
            <Title>GitRank에 로그인 중</Title>
            <Message>{message}</Message>

            <LoadingSteps>
              {steps.map((step, index) => (
                <LoadingStep key={index} active={currentStep === index} completed={currentStep > index}>
                  <StepIcon active={currentStep === index} completed={currentStep > index}>
                    {currentStep > index ? <CheckCircle size={16} /> : index + 1}
                  </StepIcon>
                  <StepText active={currentStep === index} completed={currentStep > index}>
                    {step}
                  </StepText>
                  {currentStep === index && (
                    <StepProgress>
                      <StepProgressFill progress={stepProgress} />
                    </StepProgress>
                  )}
                </LoadingStep>
              ))}
            </LoadingSteps>

            <ProgressBar>
              <ProgressFill />
            </ProgressBar>
          </>
        )}

        {status === "success" && (
          <>
            <StatusIcon status="success">
              <CheckCircle size={24} />
            </StatusIcon>
            <StatusMessage status="success">로그인 성공!</StatusMessage>
            <Message>GitRank에 오신 것을 환영합니다. 잠시 후 메인 페이지로 이동합니다.</Message>
            <ProgressBar>
              <ProgressFill status="success" />
            </ProgressBar>
          </>
        )}

        {status === "error" && (
          <>
            <StatusIcon status="error">
              <XCircle size={24} />
            </StatusIcon>
            <StatusMessage status="error">로그인 실패</StatusMessage>
            <ErrorDetails>{errorMessage}</ErrorDetails>
            <ProgressBar>
              <ProgressFill status="error" />
            </ProgressBar>
          </>
        )}

        <Lock size={16} color="#9ca3af" />
      </LoadingContainer>
    </Overlay>
  )
}

export default LoginLoadingScreen
