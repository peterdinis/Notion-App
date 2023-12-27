import { AuthUser } from "@supabase/supabase-js";
import { ReactNode } from "react";

export type AuthContextType = {
  signUp: (data: AuthData) => Promise<any>;
  signIn: (data: AuthData) => Promise<any>;
  signOut: () => Promise<any>;
  currentUser: AuthUser | null;
};

export type AuthProviderProps = {
  children?: ReactNode;
};

export type AuthData = {
  email: string;
  password: string;
};
