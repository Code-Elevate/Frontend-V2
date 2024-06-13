"use server";

import { ContestData } from "@/types/contest";
import ApiRoutes from "./api";
import { cookies } from "next/headers";

export type ManageContestDataResponse = {
  upcoming: ContestData[];
  running: ContestData[];
  past: ContestData[];
};

export const getManageContests =
  async (): Promise<ManageContestDataResponse | null> => {
    try {
      const useCookies = cookies();

      const response = await fetch(ApiRoutes.MANAGE_CONTEST, {
        headers: {
          "Content-Type": "application/json",
          ...(useCookies.has("token") && {
            "x-auth-token": useCookies.get("token")?.value,
          }),
        },
        next: {
          revalidate: 10,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return null;
      }

      return data as ManageContestDataResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
