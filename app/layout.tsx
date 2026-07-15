import type { Metadata } from "next";
import "../src/styles/index.css";

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
      <body>{children}</body>
    </html>
  );
}
