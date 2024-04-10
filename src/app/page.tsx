import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="px-24">
      <Card className="rounded-2xl bg-slate-950 shadow-2xl text-white text-center h-[760px]">
        <div className="flex justify-center items-center h-full"> {/* Center content vertically and horizontally */}
          <div className="mx-auto max-w-[683px]">
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
