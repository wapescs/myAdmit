"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { UniversityCard } from "./UniversityCard";
import { useToggleIds } from "@/hooks/useToggleIds";
import { useUserState } from "@/app/providers/UserStateProvider";
import type { University } from "@/types/university";

export function UniversityGrid({ universities }: { universities: University[] }) {
  const router = useRouter();
  const { userState } = useUserState();
  const { ids: savedIds, toggle } = useToggleIds<string>();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {universities.map((uni, i) => (
        <motion.div key={uni.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
          <UniversityCard
            uni={uni}
            saved={savedIds.includes(uni.id)}
            onSave={() => userState !== "anonymous" && toggle(uni.id)}
            onView={() => router.push(`/university/${uni.id}`)}
          />
        </motion.div>
      ))}
    </div>
  );
}
