import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "./_components/Sidebar/Sidebar";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Music",
  description: "by Josh Borseth",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} h-[calc(100dvh)] overflow-hidden`}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            <>
              <Sidebar>{children}</Sidebar>
              <Toaster />
            </>
            <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-center lg:hidden">
              <h1 className="text-3xl font-bold">
                Sorry, we have some bad news.
              </h1>
              <p>
                This app is not intended for mobile use due to incompatibility
                reasons.
              </p>
              <p>We have a mobile app coming soon!</p>
            </div>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
