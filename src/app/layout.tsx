import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "./_components/Sidebar/Sidebar";
import { Toaster } from "~/components/ui/toaster";
import { db } from "~/server/db";
import { playlists } from "~/server/db/schema";

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
  await db.insert(playlists).values({
    name: "Favorites",
  });
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} h-[calc(100dvh)] overflow-hidden`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <Sidebar>{children}</Sidebar>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
