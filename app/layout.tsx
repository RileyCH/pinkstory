// import { store } from "../redux/store";
import { Providers } from "../redux/provider";
// import { Provider } from "react-redux";
import "../style/globals.css";
import { Inter } from "next/font/google";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
