"use client";
import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";
import { navItems } from "@/data";
import Copyright from "@/components/Copyright";
import MagicButton from "@/components/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import Link from "next/link";
import { Routes } from "@/app/routes";

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 py-20 overflow-hidden">
      <div className="max-w-7xl w-full">
        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0 z-0">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <Navbar navItems={navItems} />

        <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:pt-8 md:px-8 shadow-input z-50 relative mt-20 border border-white/[0.2] bg-slate-950 bg-opacity-25">
          <h1 className="font-medium text-2xl">Login to CodeElevate</h1>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="coder@mail.com" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <MagicButton
              title="Login"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="!bg-[#161A31]"
              otherMainClasses="w-full md:mt-4"
              rounded="rounded-[4px]"
            />

            <div className="flex items-center justify-center mt-8 gap-1">
              <p className="text-sm text-neutral-300">Don't have an account?</p>
              <Link
                href={Routes.REGISTER}
                className="text-sm font-medium text-purple hover:underline"
              >
                Register
              </Link>
            </div>

            <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-[4px] h-12 font-medium shadow-input bg-slate-900 border border-white/[0.2] shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
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
        <Copyright />
      </div>
    </main>
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Login;
