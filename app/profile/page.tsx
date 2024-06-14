"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import { Routes } from "@/app/routes";

const Profile = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["token", "user"]);

  const isAuthenticated = cookies["token"] ? true : false;
  const user = cookies["user"] as string;

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`${Routes.PROFILE}/${user}`);
    } else {
      router.replace(Routes.LOGIN);
    }
  }, [isAuthenticated]);

  return <></>;
};

export default Profile;
