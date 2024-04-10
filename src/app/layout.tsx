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
          <nav className="nav container">
            <h1 className="text-display-3">CelsoAuth</h1>
            <div>
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink className="btn btn-ghost sign-in-btn">
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
                </div>
              )}
            </div>
          </nav>
        </header>
        <div className="relative w-full flex items-center justify-center ">
          <Navbar />
        </div>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <strong className="text-heading-2">CelsoAuth</strong>
            <p className="footer-tagline text-body-3">
              Visit our{" "}
              <Link className="link" href="https://kinde.com/docs">
                help center
              </Link>
            </p>

            <small className="text-subtle">
              © 2024 Celso Auth.
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
