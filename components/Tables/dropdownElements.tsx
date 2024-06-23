import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Routes } from "@/app/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContestData } from "@/types/contest";

export const ShowDetails = ({ contestId }: { contestId: string }) => {
  return (
    <DropdownMenuItem>
      <Link href={`${Routes.CONTESTS}/${contestId}`}>Show Details</Link>
    </DropdownMenuItem>
  );
};

export const ShowLeaderboard = ({ contestId }: { contestId: string }) => {
  return (
    <DropdownMenuItem>
      <Link href={`${Routes.CONTESTS}/${contestId}/leaderboard`}>
        Show Leaderboard
      </Link>
    </DropdownMenuItem>
  );
};

export const ShowParticipate = ({ contestId }: { contestId: string }) => {
  return (
    <DropdownMenuItem>
      <Link href={`${Routes.CONTESTS}/${contestId}/register`}>Participate</Link>
    </DropdownMenuItem>
  );
};

export const EditContest = ({ contestId }: { contestId: string }) => {
  return (
    <DropdownMenuItem>
      <Link href={`${Routes.MANAGE_CONTESTS}/${contestId}`}>Edit Contest</Link>
    </DropdownMenuItem>
  );
};

export const DeleteContest = ({ contestId }: { contestId: string }) => {
  return (
    <DropdownMenuItem>
      <Link href={`${Routes.MANAGE_CONTESTS}/${contestId}/delete`}>
        Delete Contest
      </Link>
    </DropdownMenuItem>
  );
};

export const TableDropdown = ({
  contest,
  showDescription = false,
  showDetails = false,
  showLeaderboard = false,
  showParticipate = false,
  editContest = false,
  deleteContest = false,
}: {
  contest: ContestData;
  showDescription?: boolean;
  showDetails?: boolean;
  showLeaderboard?: boolean;
  showParticipate?: boolean;
  editContest?: boolean;
  deleteContest?: boolean;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {showDescription && <DropdownMenuLabel>Description</DropdownMenuLabel>}
        {showDescription && (
          <p className="relative flex px-2 py-1.5 text-sm items-start">
            {contest.description}
          </p>
        )}
        {showDescription && <DropdownMenuSeparator className="h-[2px]" />}
        {showDetails && <ShowDetails contestId={contest.id} />}
        {showLeaderboard && <ShowLeaderboard contestId={contest.id} />}
        {showParticipate && <ShowParticipate contestId={contest.id} />}
        {editContest && <EditContest contestId={contest.id} />}
        {deleteContest && <DeleteContest contestId={contest.id} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
