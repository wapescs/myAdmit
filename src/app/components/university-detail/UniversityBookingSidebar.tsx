"use client";

import { UniversityBookingCard } from "./UniversityBookingCard";
import { UniversityAskAICard } from "./UniversityAskAICard";
import { UniversityAdmissionTimeline } from "./UniversityAdmissionTimeline";

export function UniversityBookingSidebar({ universityShortName }: { universityShortName: string }) {
  return (
    <div className="space-y-4">
      <UniversityBookingCard universityShortName={universityShortName} />
      <UniversityAskAICard universityShortName={universityShortName} />
      <UniversityAdmissionTimeline />
    </div>
  );
}
