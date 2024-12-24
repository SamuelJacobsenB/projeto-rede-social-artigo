import type { Metadata } from "next";
import "./globals.css";
import { Message } from "@/components";
import { Providers } from "@/contexts";

export const metadata: Metadata = {
  title: "Article",
  description: "Article - Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Message />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
