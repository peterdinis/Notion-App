"use server";

import { supabaseClient } from "@/lib/supabaseSetup";

export async function loginUser(email: string, password: string) {
  const response = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  return response;
}

export async function registerUser(email: string, password: string) {
  const { data } = await supabaseClient.from("users").select("*").eq("email", email);

  if (data?.length)
    return {
      error: {
        message: "User already exists",
      },
    };

  const respone = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/api/auth/callback",
    },
  });

  return respone;
}
