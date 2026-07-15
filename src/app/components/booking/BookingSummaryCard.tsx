"use client";

export function BookingSummaryCard({
  selDate, selTime, onConfirm,
}: {
  selDate: number;
  selTime: string;
  onConfirm: () => void;
}) {
  const rows: [string, string][] = [
    ["Mode", "Phone Call"],
    ["Date", `July ${selDate}, 2025`],
    ["Time", `${selTime} IST`],
    ["Duration", "60 minutes"],
  ];

  return (
    <div>
      <div className="p-4 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0] mb-4 space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-[#666666]">{k}</span><span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onConfirm} className="w-full py-4 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all">Confirm Booking</button>
      <p className="text-xs text-center text-[#999] mt-2">Free session · Our counselor will call you at your scheduled time</p>
    </div>
  );
}
