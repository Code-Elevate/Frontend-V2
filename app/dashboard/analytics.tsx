import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDetails } from "@/utils/services/user";
import {
  UsersIcon,
  TrophyIcon,
  CodeIcon,
  LaptopMinimal,
  Medal,
  Sigma,
} from "lucide-react";
import React from "react";

const AnalyticsCard = (props: {
  title: string;
  value: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border">
      <props.icon className="w-8 h-8 text-gray-400" />
      <div className="font-medium">{props.value}</div>
      <div className="text-sm text-gray-400">{props.title}</div>
    </div>
  );
};

const Analytics = ({ userDetails }: { userDetails: UserDetails | null }) => {
  return (
    <div className="relative my-4 mb-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between my-3">
          <CardTitle className="font-medium">Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {userDetails ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <AnalyticsCard
                title="Contests Participated"
                value={userDetails?.contestsCount}
                icon={LaptopMinimal}
              />
              <AnalyticsCard
                title="Submissions Made"
                value={userDetails?.submissionsCount}
                icon={CodeIcon}
              />
              <AnalyticsCard
                title="Teams Created"
                value={userDetails?.teamsCount}
                icon={UsersIcon}
              />
              <AnalyticsCard
                title="Best Rank"
                value={userDetails?.bestRank}
                icon={TrophyIcon}
              />
              <AnalyticsCard
                title="Max Score"
                value={Math.round(userDetails?.maxScore!)}
                icon={Medal}
              />
              <AnalyticsCard
                title="Total Score"
                value={Math.round(userDetails?.score!)}
                icon={Sigma}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-36" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
