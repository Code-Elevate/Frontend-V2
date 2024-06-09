"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/utils/providers/auth";
import { useRouter } from "next/navigation";
import { Routes } from "../routes";

const Profile = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`${Routes.PROFILE}/${user?.id}`);
    } else {
      router.replace(Routes.LOGIN);
    }
  }, [isAuthenticated]);

  return <></>;
};

export default Profile;
