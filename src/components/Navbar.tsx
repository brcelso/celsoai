'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
        <Menu setActive={setActive}>
            <Link href={"/mainpage"}>
            <MenuItem setActive={setActive} active={active} item="Home">
            
            </MenuItem>
            </Link>
            <MenuItem
            setActive={setActive} active={active} item="Our Content"
            >
               <div className="flex flex-col space-y-4 text-sm">
               <HoveredLink href="https://celso.vercel.app/">All Content</HoveredLink>
            <HoveredLink href="/languages/italian">
              Languages
            </HoveredLink>
            <HoveredLink href="/kinde">
              Kinde
            </HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">
              Music Production
            </HoveredLink>
               </div>
            </MenuItem>
            <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
            
            </MenuItem>
            </Link>
        </Menu>
    </div>
  )
}

export default Navbar