import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import styled from "@emotion/styled";
import { Activity } from "lucide-react";
import { useState } from "react";

export const ContributionHeatmap = () => {

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedDateDetails, setSelectedDateDetails] = useState<any[]>([])

  const generateDayDetails = (date: string, count: number) => {
      if (count === 0) return []
  
      const activities = []
      const commitCount = Math.floor(count * 0.6)
      const prCount = Math.floor(count * 0.2)
      const issueCount = Math.floor(count * 0.1)
      const reviewCount = count - commitCount - prCount - issueCount
  
      for (let i = 0; i < commitCount; i++) {
        activities.push({
          type: "commit",
          repo: ["awesome-project", "react-components", "python-utils"][Math.floor(Math.random() * 3)],
          message: [
            "Fix bug in authentication system",
            "Add new feature for user management",
            "Update documentation",
            "Refactor code structure",
            "Improve performance",
          ][Math.floor(Math.random() * 5)],
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
        })
      }
  
      // PR 활동
      for (let i = 0; i < prCount; i++) {
        activities.push({
          type: "pr",
          repo: ["awesome-project", "react-components"][Math.floor(Math.random() * 2)],
          message: "Opened pull request #" + (Math.floor(Math.random() * 100) + 1),
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
        })
      }
  
      // 이슈 활동
      for (let i = 0; i < issueCount; i++) {
        activities.push({
          type: "issue",
          repo: ["awesome-project", "python-utils"][Math.floor(Math.random() * 2)],
          message: "Created issue #" + (Math.floor(Math.random() * 50) + 1),
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
        })
      }
  
      // 리뷰 활동
      for (let i = 0; i < reviewCount; i++) {
        activities.push({
          type: "review",
          repo: ["react-components", "awesome-project"][Math.floor(Math.random() * 2)],
          message: "Reviewed pull request #" + (Math.floor(Math.random() * 100) + 1),
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
        })
      }
  
      return activities.sort((a, b) => a.time.localeCompare(b.time)) as { type: string; repo: string; message: string; time: string }[]
    }

  const handleDateClick = (date: string, count: number) => {
    setSelectedDate(date)
    setSelectedDateDetails(generateDayDetails(date, count))
  }

  const handleCloseDateDetails = () => {
    setSelectedDate(null)
    setSelectedDateDetails([])
  }

  const generateHeatmapData = () => {
    const data = []
    const today = new Date()
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const contributions = Math.floor(Math.random() * 10)
      data.push({
        date: date.toISOString().split("T")[0],
        count: contributions,
      })
    }
    return data
  }

  const heatmapData = generateHeatmapData()

  console.log(heatmapData)

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "#f3f4f6"
    if (count <= 2) return "#a7f3d0"
    if (count <= 4) return "#6ee7b7"
    if (count <= 6) return "#34d399"
    return "#10b981"
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit":
        return "💾"
      case "pr":
        return "🔀"
      case "issue":
        return "🐛"
      case "review":
        return "👀"
      default:
        return "📝"
    }
  }

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case "commit":
        return "Commit"
      case "pr":
        return "Pull Request"
      case "issue":
        return "Issue"
      case "review":
        return "Review"
      default:
        return "Activity"
    }
  }

  return (
    <>
    <Card>
      <CardHeader>
        <Activity size={20} />
        <div>
          <CardTitle>일별 활동</CardTitle>
          <CardDescription>지난 1년간의 기여 활동</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <HeatmapContainer>
          <HeatmapGrid>
            {heatmapData.map((day, index) => (
              <HeatmapCell
                key={index}
                intensity={getHeatmapColor(day.count)}
                title={`${day.date}: ${day.count} contributions`}
                onClick={() => handleDateClick(day.date, day.count)}
              />
            ))}
          </HeatmapGrid>
          <HeatmapLegend>
            <span>Less</span>
            <HeatmapLegendColors>
              <HeatmapCell intensity="#f3f4f6" />
              <HeatmapCell intensity="#a7f3d0" />
              <HeatmapCell intensity="#6ee7b7" />
              <HeatmapCell intensity="#34d399" />
              <HeatmapCell intensity="#10b981" />
            </HeatmapLegendColors>
            <span>More</span>
          </HeatmapLegend>
        </HeatmapContainer>
      </CardContent>
    </Card>

{selectedDate && (
  <DateDetailsOverlay onClick={handleCloseDateDetails}>
    <DateDetailsModal onClick={(e) => e.stopPropagation()}>
      <DateDetailsHeader>
        <DateDetailsTitle>
          {new Date(selectedDate).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </DateDetailsTitle>
        <DateDetailsCloseButton onClick={handleCloseDateDetails}>✕</DateDetailsCloseButton>
      </DateDetailsHeader>

      <DateDetailsContent>
        <DateDetailsSummary>
          <DateDetailsSummaryCount>{selectedDateDetails.length}</DateDetailsSummaryCount>
          <DateDetailsSummaryText>개의 활동</DateDetailsSummaryText>
        </DateDetailsSummary>

        {selectedDateDetails.length > 0 ? (
          <ActivityList>
            {selectedDateDetails.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon type={activity.type}>{getActivityIcon(activity.type)}</ActivityIcon>
                <ActivityContent>
                  <ActivityMessage>{activity.message}</ActivityMessage>
                  <ActivityMeta>
                    <span>{getActivityTypeText(activity.type)}</span>
                    <span>•</span>
                    <span>{activity.repo}</span>
                  </ActivityMeta>
                </ActivityContent>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityItem>
            ))}
          </ActivityList>
        ) : (
          <EmptyState>이 날에는 활동이 없었습니다.</EmptyState>
        )}
      </DateDetailsContent>
    </DateDetailsModal>
  </DateDetailsOverlay>
)}
</>
  );
}

export default ContributionHeatmap;

const HeatmapContainer = styled.div`
  overflow-x: auto;
`

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 0.25rem;
  min-width: 800px;
`

const HeatmapCell = styled.div<{ intensity: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.125rem;
  background-color: ${(props) => props.intensity};
  cursor: pointer;
  transition: transform 0.1s ease;
  
  &:hover {
    transform: scale(1.2);
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
  }
`

const HeatmapLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`

const HeatmapLegendColors = styled.div`
  display: flex;
  gap: 0.25rem;
`

const DateDetailsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

const DateDetailsModal = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 32rem;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const DateDetailsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DateDetailsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

const DateDetailsCloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  
  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`

const DateDetailsContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
`

const DateDetailsSummary = styled.div`
  background-color: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const DateDetailsSummaryCount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 0.25rem;
`

const DateDetailsSummaryText = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #f9fafb;
  }
`

const ActivityIcon = styled.div<{ type: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
  
  ${(props) => {
    switch (props.type) {
      case "commit":
        return `
          background-color: #dcfce7;
          color: #166534;
        `
      case "pr":
        return `
          background-color: #dbeafe;
          color: #1d4ed8;
        `
      case "issue":
        return `
          background-color: #fef3c7;
          color: #92400e;
        `
      case "review":
        return `
          background-color: #f3e8ff;
          color: #7c3aed;
        `
      default:
        return `
          background-color: #f3f4f6;
          color: #6b7280;
        `
    }
  }}
`

const ActivityContent = styled.div`
  flex: 1;
`

const ActivityMessage = styled.div`
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
`

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`

const ActivityTime = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  margin-left: auto;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`
