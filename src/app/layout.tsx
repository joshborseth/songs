import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "./_components/Sidebar/Sidebar";
import { Toaster } from "~/components/ui/toaster";
import { auth } from "@clerk/nextjs/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Music",
  description: "by Josh Borseth",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} h-[calc(100dvh)] overflow-hidden`}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            {userId !== "user_2fIitDhvWByQ2tp0qDPpravyUrU" ? (
              <div className="flex h-screen w-screen items-center justify-center">
                <span className="text-5xl">Go Away Jedsen</span>
              </div>
            ) : (
              <Sidebar>{children}</Sidebar>
            )}
            <Toaster />
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
