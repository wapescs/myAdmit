import { serif } from "@/styles/typography";
import { UniversityListSkeleton } from "@/app/components/university/UniversityListSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
          <div className="mb-10">
            <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Explore</div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>
              All Universities
            </h1>
            <p className="text-[#666666] mt-2">Browse and filter universities from our full catalog</p>
          </div>
          <UniversityListSkeleton count={12} />
        </div>
      </section>
    </div>
  );
}
