"use server";

import ApiRoutes from "./api";

export type UserSearchResult = {
  id: string;
  name: string;
  email: string;
};

export const searchUsers = async (
  query: string
): Promise<UserSearchResult[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(`${ApiRoutes.SEARCH}?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10 * 60,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return [];
    }

    return data.users as UserSearchResult[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
