import "../style/globals.css";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Nav />
      </body>
    </html>
  );
}
