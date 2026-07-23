"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle />
            <AlertTitle>Couldn&apos;t load universities</AlertTitle>
            <AlertDescription>
              <p>{error.message || "Something went wrong."}</p>
              <button onClick={reset} className="mt-2 text-sm font-semibold underline">
                Try again
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
