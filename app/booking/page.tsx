import { BookingPage } from "@/app/components/booking/BookingPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page() {
  return (
    <FeatureGate requires="full" featureName="Book a Session">
      <BookingPage />
    </FeatureGate>
  );
}
