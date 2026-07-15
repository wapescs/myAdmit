import type { Metadata } from "next";
import "../src/styles/index.css";
import { UserStateProvider } from "@/app/providers/UserStateProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Navbar } from "@/app/components/layout/Navbar/Navbar";
import { ConditionalFooter } from "@/app/components/layout/Footer/ConditionalFooter";

export const metadata: Metadata = {
  title: "EduPath | AI Admission Counseling",
  description:
    "AI-powered platform guiding students to discover, compare, and apply to international universities with personalized counseling and admission tracking.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserStateProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <ConditionalFooter />
          </ThemeProvider>
        </UserStateProvider>
      </body>
    </html>
  );
}
