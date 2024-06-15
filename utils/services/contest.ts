"use server";

import ApiRoutes from "./api";

export type ContestProblemResponse = {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
};

export type ContestResponse = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: string;
  startTime: string;
  endTime: string;
  maxTeamSize: number;
  duration: string;
  organizers: string[];
  penalty: {
    isOn: boolean;
    value: number;
  };
  problems?: ContestProblemResponse[];
};

export const getContest = async (
  id: string
): Promise<ContestResponse | null> => {
  try {
    const response = await fetch(ApiRoutes.CONTEST.replace(":id", id), {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return data as ContestResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
