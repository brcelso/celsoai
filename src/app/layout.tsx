import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celso AI",
  description: "Generated by brcelso",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
      <header>
          <nav className="flex justify-between items-center p-8 px-24">
            <div>
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink className="btn btn-light sign-in-btn">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
                </>
              ) : (
                <div className="profile-blob">
                  {user?.picture ? (
                    <img
                      className="avatar"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="avatar">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-heading-2">
                      {user?.given_name} {user?.family_name}
                    </p>

                    <LogoutLink className="text-subtle">Logout</LogoutLink>
                  </div>
                  <div className="relative w-full flex items-center justify-center ">
                  <Navbar />
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
