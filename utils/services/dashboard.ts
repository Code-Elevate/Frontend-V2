"use client";

import { ContestData } from "@/types/contest";
import { useAuth } from "../providers/auth";
import ApiRoutes from "./api_routes";

export type ContestDataResponse = {
  users_running: ContestData[] | null;
  upcoming: ContestData[];
  running: ContestData[];
  past: ContestData[];
};

export const getContests = async (
  isAuthenticated: boolean,
  token: string | null
): Promise<ContestDataResponse | null> => {
  const response = await fetch(ApiRoutes.CONTESTS, {
    headers: {
      "Content-Type": "application/json",
      ...(isAuthenticated && { "x-auth-token": token! }),
    },
    next: {
      revalidate: 10000,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return null;
  }

  return data as ContestDataResponse;
};
