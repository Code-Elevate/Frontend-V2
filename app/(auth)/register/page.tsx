"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FaLocationArrow } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

import { Routes } from "@/app/routes";
import Footer from "@/components/Footer";
import LabelInputContainer from "@/components/LabelInputContainer";
import MainPage from "@/components/MainPageHOC";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import MagicButton from "@/components/ui/MagicButton";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { register } from "@/utils/services/auth";
import { IconBrandGoogle } from "@tabler/icons-react";

export const maxDuration = 60;

const Register = () => {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

  const [__, setCookies] = useCookies(["token", "user"]);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields", {
        description: `${[
          !name && "Name",
          !email && "Email",
          !password && "Password",
        ]
          .filter(Boolean)
          .join(", ")
          .replace(/,([^,]*)$/, " and$1")} is required`,
        action: {
          label: <IoClose />,
          onClick: () => toast.dismiss(),
        },
        duration: 3000,
      });
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters", {
        action: {
          label: <IoClose />,
          onClick: () => toast.dismiss(),
        },
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Registering...");

    const response = await register(name, email, password);
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, {
        id: toastId,
        duration: 3000,
        action: {
          label: <IoClose />,
          onClick: () => toast.dismiss(),
        },
      });

      setLoading(false);
      return;
    }

    setCookies("token", response.headers.get("x-auth-token"));
    setCookies("user", data.user.id);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.replace(redirect || Routes.DASHBOARD);

    setLoading(false);

    toast.success(`Welcome, ${data.user.name}`, {
      id: toastId,
      duration: 3000,
      action: {
        label: <IoClose />,
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <MainPage className="pt-20">
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0 z-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:pt-8 md:px-8 shadow-input z-50 relative mt-20 border border-white/[0.2] bg-slate-950 bg-opacity-25">
        <h1 className="font-medium text-2xl">Register to CodeElevate</h1>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Coder's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="coder@mail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <MagicButton
            title={loading ? "Registering..." : "Register"}
            icon={<FaLocationArrow />}
            position="right"
            otherClasses="!bg-[#161A31]"
            otherMainClasses="w-full md:mt-4"
            rounded="rounded-[4px]"
            disabled={loading || !name || !email || !password}
          />

          <div className="flex items-center justify-center mt-8 gap-1">
            <p className="text-sm text-neutral-300">Already have an account?</p>
            <Link
              href={
                redirect ? `${Routes.LOGIN}?redirect=${redirect}` : Routes.LOGIN
              }
              className="text-sm font-medium text-purple hover:underline"
            >
              Login
            </Link>
          </div>

          <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-[4px] h-12 font-medium shadow-input bg-slate-900 border border-white/[0.2] shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
              onClick={() => toast.info("Google Sign In is coming soon!")}
              disabled={loading}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
              <span className="text-neutral-300 text-sm ">
                Continue with Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </MainPage>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </>
  );
};

export default Register;
