import { Providers } from "@/redux/provider";

import Script from "next/script";
import "../style/globals.css";
import { Inter, Noto_Sans_TC } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const notoSansTc = Noto_Sans_TC({
  weight: ["100", "300", "500", "700", "900"],
  subsets: ["latin"],
  style: "normal",
  display: "auto",
});

export const metadata = {
  title: "PinkStory",
  description: "Enrich your life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        {/* <body className={inter.className}>{children}</body> */}
        <body>{children}</body>
      </html>
    </Providers>
  );
}
