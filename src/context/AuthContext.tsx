"use client";

import { useContext, useState, useEffect, createContext, FC } from "react";
import { supabaseClient } from "@/lib/supabaseSetup";
import { AuthContextType, AuthData, AuthProviderProps } from "./authTypes";
import { AuthUser } from "@supabase/supabase-js";

export const AuthContext = createContext<any | undefined>(
  undefined
);

export function useAuth() {
    return useContext(AuthContext);
}

const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabaseClient.auth.getSession();
    setCurrentUser(session.then((r) => r.data.session!.user));
    setLoading(false);

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setCurrentUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    signUp: (data: AuthData) => supabaseClient.auth.signUp(data),
    signIn: (data: AuthData) => supabaseClient.auth.signInWithPassword(data),
    signOut: () => supabaseClient.auth.signOut(),
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
