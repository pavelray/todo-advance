import { Inter } from "next/font/google";
import SessionProvider from "@/components/Business/SessionProvider/SessionProvider";
import Navbar from "@/components/Business/Navbar/Navbar";
import { getCurrentUser } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "A advance planner app for a person how like to plan everything",
};

export default async function RootLayout({ children }) {
  const session = await getCurrentUser();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          {session && <Navbar />}
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
