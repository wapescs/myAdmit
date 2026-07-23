"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchUniversityById } from "@/services/university.client";
import type { UniversityDetail } from "@/types/university";

export function useUniversity(id: string) {
  const [university, setUniversity] = useState<UniversityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchUniversityById(id)
      .then(data => {
        if (!cancelled) setUniversity(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setUniversity(null);
        setError(err instanceof Error ? err.message : "Failed to load university.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, reloadToken]);

  const refetch = useCallback(() => setReloadToken(t => t + 1), []);

  return { university, isLoading, error, refetch };
}
