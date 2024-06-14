"use client";

import { SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const NavPath = () => {
  const url = usePathname();

  const path = url.split("/").filter((item) => item !== "");

  return (
    <Breadcrumb className="relative">
      <BreadcrumbList>
        {path.map((item, index) => {
          if (index === path.length - 1) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${item}`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavPath;
