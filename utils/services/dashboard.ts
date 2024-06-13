"use server";

import { ContestData } from "@/types/contest";
import ApiRoutes from "./api";
import { cookies } from "next/headers";

export type ContestDataResponse = {
  users_running: ContestData[];
  upcoming: ContestData[];
  running: ContestData[];
  past: ContestData[];
};

export const getContests = async (): Promise<ContestDataResponse | null> => {
  try {
    const useCookies = cookies();

    const response = await fetch(ApiRoutes.CONTESTS, {
      headers: {
        "Content-Type": "application/json",
        ...(useCookies.has("token") && {
          "x-auth-token": useCookies.get("token")?.value,
        }),
      },
      next: {
        revalidate: 60,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data as ContestDataResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
