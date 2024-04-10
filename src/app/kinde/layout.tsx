// import "./globals.css";
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
  } from "@kinde-oss/kinde-auth-nextjs/components";
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
  import Link from "next/link";
  
  export const metadata = {
    title: "Kinde Auth",
    description: "Kinde with NextJS App Router",
  };
  
  export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    return (
      <html lang="en">
        <body>
          
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
                © 2023 KindeAuth, Inc. All rights reserved
              </small>
            </div>
          </footer>
        </body>
      </html>
    );
  }