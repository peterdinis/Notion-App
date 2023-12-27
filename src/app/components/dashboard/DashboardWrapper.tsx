import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardSetup from "./DashboardSetup";
import { useAuth } from "@/context/AuthContext";
import { valibotResolver } from "@hookform/resolvers/valibot";

const DashboardWrapper = async () => {
  const {currentUser} = useAuth();

  if (!valibotResolver) return;

  const workspace = await db.workspace.findFirst({
    where: {
      userId: currentUser.id as unknown as number,
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
        <DashboardSetup user={currentUser} />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardWrapper;
