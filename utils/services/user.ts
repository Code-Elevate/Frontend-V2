"use server";

import { User } from "@/types/user";
import ApiRoutes from "./api_routes";
import { cookies } from "next/headers";

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  teamsCount: number;
  contestsCount: number;
  submissionsCount: number;
  score: number;
  maxScore: number;
  bestRank: number;
  registeredOn: string;
  lastLogin: string;
};

export type UserHistory = {
  user: User;
  contests: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    duration: string;
    team: {
      id: string;
      name: string;
    };
    problems: string[];
    score: number;
    rank?: number;
  }[];
};

export const getUserDetails = async (): Promise<UserDetails | null> => {
  try {
    const useCookies = cookies();

    const response = await fetch(ApiRoutes.DETAILS, {
      headers: {
        "Content-Type": "application/json",
        ...(useCookies.has("token") && {
          "x-auth-token": useCookies.get("token")?.value,
        }),
      },
      next: {
        revalidate: 5 * 60,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data as UserDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserHistory = async (): Promise<UserHistory | null> => {
  try {
    const useCookies = cookies();

    const response = await fetch(ApiRoutes.HISTORY, {
      headers: {
        "Content-Type": "application/json",
        ...(useCookies.has("token") && {
          "x-auth-token": useCookies.get("token")?.value,
        }),
      },
      next: {
        revalidate: 5 * 60,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data as UserHistory;
  } catch (error) {
    console.error(error);
    return null;
  }
};
