"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserState } from "@/types/user.types";

interface UserStateContextValue {
  userState: UserState;
  setUserState: (state: UserState) => void;
}

const UserStateContext = createContext<UserStateContextValue | null>(null);

export function UserStateProvider({ children }: { children: ReactNode }) {
  const [userState, setUserState] = useState<UserState>("anonymous");

  return (
    <UserStateContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const ctx = useContext(UserStateContext);
  if (!ctx) throw new Error("useUserState must be used within UserStateProvider");
  return ctx;
}
