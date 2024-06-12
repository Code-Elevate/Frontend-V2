import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDetails } from "@/utils/services/user";
import {
  UsersIcon,
  TrophyIcon,
  CodeIcon,
  MessageCircleIcon,
  LaptopMinimal,
  Medal,
  Sigma,
} from "lucide-react";
import React from "react";

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
              <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border border">
                <UsersIcon className="w-8 h-8 text-gray-400" />
                <div className="font-medium">{userDetails?.teamsCount}</div>
                <div className="text-sm text-gray-400">Teams Created</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border">
                <LaptopMinimal className="w-8 h-8 text-gray-400" />
                <div className="font-medium">{userDetails?.contestsCount}</div>
                <div className="text-sm text-gray-400">
                  Contests Participated
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border">
                <CodeIcon className="w-8 h-8 text-gray-400" />
                <div className="font-medium">
                  {userDetails?.submissionsCount}
                </div>
                <div className="text-sm text-gray-400">Submissions Made</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border">
                <Sigma className="w-8 h-8 text-gray-400" />
                <div className="font-medium">
                  {Math.round(userDetails?.score!)}
                </div>
                <div className="text-sm text-gray-400">Total Score</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border">
                <Medal className="w-8 h-8 text-gray-400" />
                <div className="font-medium">
                  {Math.round(userDetails?.maxScore!)}
                </div>
                <div className="text-sm text-gray-400">Max Score</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-6 rounded-lg bg-gray-900 hover:bg-gray-800 h-36 border">
                <TrophyIcon className="w-8 h-8 text-gray-400" />
                <div className="font-medium">{userDetails?.bestRank}</div>
                <div className="text-sm text-gray-400">Best Rank</div>
              </div>
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
