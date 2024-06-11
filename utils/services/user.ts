import { User } from "@/types/user";
import ApiRoutes from "./api_routes";

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

export const getUserHistory = async (
  token: string
): Promise<UserHistory | null> => {
  try {
    const response = await fetch(ApiRoutes.HISTORY, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
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
