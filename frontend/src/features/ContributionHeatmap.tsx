import { ContributionsResponse } from "@/api/stats";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/Card";
import styled from "@emotion/styled";
import { Activity } from "lucide-react";
import { useState } from "react";

export const ContributionHeatmap = ({
  contributions,
}: {
  contributions: ContributionsResponse | null;
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  const handleDateClick = (date: string, count: number) => {
    setSelectedDate(date);
    setSelectedCount(count);
  };

  const heatmapData =
    contributions?.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        color: day.color,
      }))
    ) ?? [];

  return (
    <HeatmapContainer>
      <HeatmapSection>
        <Card style={{ height: "100%" }}>
          <CardHeader>
            <Activity size={20} />
            <div>
              <CardTitle>일별 활동</CardTitle>
              <CardDescription>지난 1년간의 기여 활동</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {heatmapData.length > 0 ? (
              <HeatmapGrid>
                {heatmapData.map((day, index) => (
                  <HeatmapCell
                    key={index}
                    intensity={day.color}
                    title={`${day.date}: ${day.count} contributions`}
                    onClick={() => handleDateClick(day.date, day.count)}
                  />
                ))}
              </HeatmapGrid>
            ) : (
              <NoDataText>히트맵을 보려면 셀을 클릭해 주세요.</NoDataText>
            )}
          </CardContent>
        </Card>
      </HeatmapSection>

      <DetailSection>
        <Card style={{ height: "100%" }}>
          <CardContent>
            {selectedDate ? (
              <>
                <DateDetailsHeader>
                  <DateDetailsTitle>
                    {new Date(selectedDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </DateDetailsTitle>
                </DateDetailsHeader>
                <DateDetailsContent>
                  <DateDetailsSummary>
                    <DateDetailsSummaryCount>{selectedCount}</DateDetailsSummaryCount>
                    <DateDetailsSummaryText>개의 활동</DateDetailsSummaryText>
                  </DateDetailsSummary>
                </DateDetailsContent>
              </>
            ) : (
              <NoDataText>클릭하면 해당 날짜의 활동이 표시됩니다.</NoDataText>
            )}
          </CardContent>
        </Card>
      </DetailSection>
    </HeatmapContainer>
  );
};

export default ContributionHeatmap;

const HeatmapContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: stretch;
  margin-bottom: 20px;
`;

const HeatmapSection = styled.div`
  flex: 3;
`;

const DetailSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  row-gap: 2px;
  column-gap: 2px;
  width: fit-content;
`;

const HeatmapCell = styled.div<{ intensity: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${(props) => props.intensity};
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.2);
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
  }
`;

const NoDataText = styled.p`
  font-size: 14px;
  color: #9ca3af;
  padding: 1rem 0;
`;

const DateDetailsHeader = styled.div`
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
`;

const DateDetailsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const DateDetailsContent = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  margin-top: 30px;
  `;
  
  const DateDetailsSummary = styled.div`
  background-color: #f8fafc;
  border-radius: 0.5rem;
  text-align: center;
  width: 100%;
  padding: 24px;
`;

const DateDetailsSummaryCount = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #10b981;
`;

const DateDetailsSummaryText = styled.div`
  font-size: 16px;
  color: #10b981;
`;
