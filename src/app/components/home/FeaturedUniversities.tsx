"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { UniversityCard } from "@/app/components/common/UniversityCard";
import { useToggleIds } from "@/hooks/useToggleIds";
import { useUserState } from "@/app/providers/UserStateProvider";
import { UNIVERSITIES } from "@/constants/universities";
import { serif } from "@/styles/typography";

export function FeaturedUniversities() {
  const { userState } = useUserState();
  const { ids: saved, toggle } = useToggleIds();
  const router = useRouter();

  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Top Picks</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Featured Universities</h2>
            <p className="text-[#666666] mt-2">Handpicked institutions with excellent placement records</p>
          </div>
          <Link href="/universities" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#8B2626] hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITIES.map((uni, i) => (
            <motion.div key={uni.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.09 }}>
              <UniversityCard
                uni={uni}
                saved={saved.includes(uni.id)}
                onSave={() => userState !== "anonymous" && toggle(uni.id)}
                onView={() => router.push(`/university/${uni.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
