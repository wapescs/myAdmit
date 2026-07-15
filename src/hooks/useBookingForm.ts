"use client";

import { useState } from "react";

export function useBookingForm() {
  const [selDate, setSelDate] = useState(15);
  const [selTime, setSelTime] = useState("10:00 AM");
  const [selCounselor, setSelCounselor] = useState(0);

  return { selDate, setSelDate, selTime, setSelTime, selCounselor, setSelCounselor };
}
