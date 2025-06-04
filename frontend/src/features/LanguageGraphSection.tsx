import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import LanguageGraph from "@/components/LanguageGraph";
import { Code } from "lucide-react";

export const LanguageGraphSection = () => {
  return (
    <Card>
      <CardHeader>
        <Code size={20} />
        <div>
          <CardTitle>언어 사용 통계</CardTitle>
          <CardDescription>가장 많이 사용하는 프로그래밍 언어</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <LanguageGraph
          data={{
            languages: [
              { color: "#3178c6", name: "TypeScript", size: 458762 },
              { color: "#f1e05a", name: "JavaScript", size: 287432 },
              { color: "#563d7c", name: "CSS", size: 120845 },
              { color: "#e34c26", name: "HTML", size: 98345 },
              { color: "#3572A5", name: "Python", size: 45678 },
              { color: "#41b883", name: "Vue", size: 23456 },
            ],
          }}
          showStats={false}
          compact={true}
        />
      </CardContent>
    </Card>
  );
}
export default LanguageGraphSection;