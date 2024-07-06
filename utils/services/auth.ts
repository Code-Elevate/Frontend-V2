"use server";

import ApiRoutes from "./api";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(ApiRoutes.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return response;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(ApiRoutes.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
};
