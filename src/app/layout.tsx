import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyTasks",
  description: "Manage Tasks",
};

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <main className="mx-auto bg-bg-violet">
          <div className="container flex items-start justify-center min-h-screen">
            <div className="px-28 py-20 mt-24 mw-1 rounded-lg bg-black shadow-3xl ">
          {/* <h1 className="text-white">My Tasks</h1> */}
              <MantineProvider>{children}</MantineProvider>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
