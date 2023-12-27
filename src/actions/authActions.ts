"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function loginUser(email: string, password: string) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
}

export async function registerUser(email: string, password: string) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.from("users").select("*").eq("email", email);

  if (data?.length)
    return {
      error: {
        message: "User already exists",
      },
    };

  const respone = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/api/auth/callback",
    },
  });

  return respone;
}
