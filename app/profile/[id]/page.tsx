"use client";

import React from "react";

import { useRouter } from "next/navigation";
import MagicButton from "@/components/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { Routes } from "@/app/routes";
import { useCookies } from "react-cookie";

const Profile = ({ params }: { params: { id: string } }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["token", "user"]);

  const isAuthenticated = cookies["token"] ? true : false;
  const user = cookies["user"] as string;

  const router = useRouter();

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.replace(Routes.HOME);
  };

  return (
    <>
      <div>Profile {params.id}</div>

      {isAuthenticated && user === params.id && (
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
