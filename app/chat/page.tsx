import { ChatPage } from "@/app/components/chat/ChatPage";
import { FeatureGate } from "@/app/components/access/FeatureGate";

export default function Page() {
  return (
    <FeatureGate requires="full" featureName="AI Advisor">
      <ChatPage />
    </FeatureGate>
  );
}
