
import type { Metadata } from "next";
// @ts-ignore
import "@/app/globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "DevDash | AI Persona",
  description: "GitHub Analyzer",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased text-slate-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}