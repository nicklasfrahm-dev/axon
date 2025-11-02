import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { BrainCircuit } from "lucide-react";
import Avatar from "@axon/app/components/Avatar";
import { auth } from "@axon/auth";
import "@axon/app/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axon",
  description:
    "A developer platform to get code from idea to production quickly.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <nav className="w-full h-16 text-[hsl(var(--header-foreground))] p-2 flex flex-row">
          <div className="p-2 flex items-center grow">
            <BrainCircuit strokeWidth={2} size={36} />
            <h1 className="ml-4 text-2xl font-semibold">Axon</h1>
          </div>
          <Avatar user={session?.user} />
        </nav>
        {children}
      </body>
    </html>
  );
}
