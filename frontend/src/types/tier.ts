export interface TierInfo {
  name: string;
  emoji: string;
  color: string;
  description: string;
  minScore: number;
  maxScore: number;
}

export const TIERS: TierInfo[] = [
  {
    name: "루키",
    emoji: "🐣",
    color: "#a3a3a3",
    description: "이제 막 키보드를 두드리기 시작한 병아리 개발자",
    minScore: 0,
    maxScore: 9,
  },
  {
    name: "코더벌레",
    emoji: "🐛",
    color: "#8bc34a",
    description: "자잘한 버그를 먹고 자라는 성장기 코더",
    minScore: 10,
    maxScore: 19,
  },
  {
    name: "빌더",
    emoji: "🔧",
    color: "#03a9f4",
    description: "프로젝트를 하나씩 완성하며 실력을 다져가는 중",
    minScore: 20,
    maxScore: 29,
  },
  {
    name: "디버그 마스터",
    emoji: "🧠",
    color: "#ff9800",
    description: "로그 없이도 버그 냄새를 맡는 숙련자",
    minScore: 30,
    maxScore: 49,
  },
  {
    name: "코드 워리어",
    emoji: "🦾",
    color: "#9c27b0",
    description: "생산성과 퀄리티를 겸비한 전투형 개발자",
    minScore: 50,
    maxScore: 69,
  },
  {
    name: "시니어 오브 시니어",
    emoji: "🔮",
    color: "#673ab7",
    description: "기술 아키텍처부터 팀 리딩까지 다 되는 실력자",
    minScore: 70,
    maxScore: 99,
  },
  {
    name: "전설의 깃허버",
    emoji: "🐲",
    color: "#ff1744",
    description: "모든 커밋이 역사가 되는 GitHub 전설",
    minScore: 100,
    maxScore: Infinity,
  },
];
