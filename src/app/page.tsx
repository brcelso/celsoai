"use client"

import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@vue/composition-api"; // Import for media query

export default function LoginPage() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed

  return (
    <main className="px-4"> {/* Adjust padding for smaller screens */}
      <Card
        className={`rounded-2xl bg-slate-950 shadow-2xl text-white text-center 
                  ${isSmallScreen ? "max-w-full mx-auto" : "max-w-[683px] mx-auto"}`}
      >
        <div className="flex items-center justify-center h-full"> {/* New flexbox for centering */}
          <div className="text-center"> {/* Redundant text-center for clarity */}
            <h1 className="text-6xl font-bold leading-tight">
              Welcome to my page
            </h1>
            <p className="text-3xl mt-2">Please login to begin</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
