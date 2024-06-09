"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/utils/providers/auth";
import { useRouter } from "next/navigation";
import MagicButton from "@/components/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { Routes } from "@/app/routes";

const Profile = ({ params }: { params: { id: string } }) => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  const removeAuth = useAuth((state) => state.removeAuth);

  const router = useRouter();

  const handleLogout = () => {
    removeAuth();
    router.replace(Routes.HOME);
  };

  return (
    <>
      <div>Profile {params.id}</div>

      {isAuthenticated && user?.id === params.id && (
        <MagicButton
          title="Logout"
          icon={<FaLocationArrow />}
          position="right"
          otherClasses="!bg-[#161A31]"
          handleClick={handleLogout}
        />
      )}
    </>
  );
};

export default Profile;
