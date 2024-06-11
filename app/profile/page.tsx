"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { Routes } from "../routes";
import { useCookies } from "react-cookie";

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
