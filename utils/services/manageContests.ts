"use server";

import { cookies } from "next/headers";

import { ContestData } from "@/types/contest";

import ApiRoutes from "./api";

export type ManageContestDataResponse = {
  upcoming: ContestData[];
  running: ContestData[];
  past: ContestData[];
};

export type NewContestData = {
  title: string;
  description: string;
  longDescription: string;
  startTime: string;
  endTime: string;
  maxTeamSize: number;
  organizers: string[];
  penalty: {
    isOn: boolean;
    value: number;
  };
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

export const createNewContest = async (
  contestData: NewContestData
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const useCookies = cookies();

    const response = await fetch(ApiRoutes.NEW_CONTEST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(useCookies.has("token") && {
          "x-auth-token": useCookies.get("token")?.value,
        }),
      },
      body: JSON.stringify(contestData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred",
    };
  }
};
