import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="px-24">
      <Card className="rounded-2xl bg-slate-950 shadow-2xl text-white text-center">
        <div className="mx-auto max-w-[683px] mt-[215px]">
          <h1 className="text-6xl font-bold leading-tight">
            Welcome to my page
          </h1>
          <p className="text-3xl mt-2">Please login to begin</p>
        </div>
      </Card>

      <style jsx>{`
        /* Default styles */
        .px-24 {
          padding: 24px;
        }

        /* Styles for screens smaller than 768px */
        @media screen and (max-width: 768px) {
          .px-24 {
            padding: 16px;
          }
          .max-w-[683px] {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
