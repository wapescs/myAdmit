"use client";

import { useState } from "react";

export function useBookingForm() {
  const [selDate, setSelDate] = useState(15);
  const [selTime, setSelTime] = useState("10:00 AM");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submit() {
    setIsSubmitted(true);
  }

  return { selDate, setSelDate, selTime, setSelTime, isSubmitted, submit };
}
