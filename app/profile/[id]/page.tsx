"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { FaLocationArrow } from "react-icons/fa6";

import { Routes } from "@/app/routes";
import MagicButton from "@/components/ui/MagicButton";

const Profile = ({ params }: { params: { id: string } }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["token", "user"]);

  const isAuthenticated = cookies["token"] ? true : false;
  const user = cookies["user"] as string;

  const router = useRouter();

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("user");
    localStorage.removeItem("user");

    setTimeout(() => {
      router.replace(Routes.HOME);
    }, 100);
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
