import { Providers } from "@/redux/provider";
import LoginStatus from "@/components/login/LoginStatus";
import Script from "next/script";
import "../style/globals.css";

export const metadata = {
  title: "PinkStory",
  description: "Enrich your life, anytime, anywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <LoginStatus />
        <body>{children}</body>
      </html>
    </Providers>
  );
}
