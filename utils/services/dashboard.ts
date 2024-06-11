import { ContestData } from "@/types/contest";
import ApiRoutes from "./api_routes";

export type ContestDataResponse = {
  users_running: ContestData[] | null;
  upcoming: ContestData[];
  running: ContestData[];
  past: ContestData[];
};

export const getContests = async (
  token: string | null
): Promise<ContestDataResponse | null> => {
  try {
    const response = await fetch(ApiRoutes.CONTESTS, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { "x-auth-token": token }),
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
  } catch (error) {
    console.error(error);
    return null;
  }
};
