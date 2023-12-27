import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { supabaseServerClient } from "@/lib/supabaseSetup";
import DashboardSetup from "./DashboardSetup";

const DashboardWrapper = async () => {
  const supabase = supabaseServerClient;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  console.log("U", user);

  const workspace = await db.workspace.findFirst({
    where: {
      userId: user.id as unknown as number,
    },
  });

  if (!workspace)
    return (
      <div
        className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  "
      >
        <DashboardSetup user={user} />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardWrapper;
