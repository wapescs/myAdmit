import type { Metadata } from "next";
import "../src/styles/index.css";
import { UserStateProvider } from "@/app/providers/UserStateProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { AccessProvider } from "@/lib/access/AccessProvider";
import { AccessModals } from "@/app/components/access/AccessModals";
import { Navbar } from "@/app/components/layout/Navbar/Navbar";
import { ConditionalFooter } from "@/app/components/layout/Footer/ConditionalFooter";
import { UserSwitcher } from "@/dev/UserSwitcher";

export const metadata: Metadata = {
  title: "MyAdmit | AI Admission Counseling",
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
          <AccessProvider>
            <ThemeProvider>
              <Navbar />
              <main>{children}</main>
              <ConditionalFooter />
              <AccessModals />
              <UserSwitcher />
            </ThemeProvider>
          </AccessProvider>
        </UserStateProvider>
      </body>
    </html>
  );
}
