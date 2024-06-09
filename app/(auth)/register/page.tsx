"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";

import Copyright from "@/components/Copyright";
import MagicButton from "@/components/ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import Link from "next/link";
import { Routes, navItems } from "@/app/routes";
import { login, register } from "@/utils/services/auth";
import router, { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { useAuth } from "@/utils/providers/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";

const Register = () => {
  const router = useRouter();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const setToken = useAuth((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(Routes.HOME);
    }
  }, [isAuthenticated]);

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
      return;
    }

    setToken(response.headers.get("x-auth-token"));
    setUser(data.user);

    router.replace(Routes.HOME);

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
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 py-20 overflow-hidden">
      <div className="max-w-7xl w-full">
        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0 z-0">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <Navbar navItems={navItems} />

        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input z-50 relative mt-20 border border-white/[0.2] bg-slate-950 bg-opacity-25">
          <h1 className="font-medium text-2xl">Register to CodeElevate</h1>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Coder's name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="coder@mail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>

            <MagicButton
              title="Register"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="!bg-[#161A31]"
              otherMainClasses="w-full md:mt-4"
              rounded="rounded-[4px]"
            />

            <div className="flex items-center justify-center mt-8 gap-1">
              <p className="text-sm text-neutral-300">
                Already have an account?
              </p>
              <Link
                href={Routes.LOGIN}
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

export default Register;
