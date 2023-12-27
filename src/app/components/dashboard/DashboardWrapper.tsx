"use client"

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../shared/AppHeader";
import { supabaseServerClient } from "@/lib/supabaseSetup";
import { db } from "@/lib/db";
import DashboardSetup from "./DashboardSetup";

const DashboardWrapper: FC = () => {
  const router = useRouter();
  const [workspace, setWorkspace] = useState<any>(null);

  useEffect(() => {
    const userResponse = supabaseServerClient.auth.getUser();

    userResponse
      .then((res) => {
        const userId = res.data.user?.id;
        if (userId) {
          db.workspace
            .findFirst({
              where: {
                userId: userId as unknown as number,
              },
            })
            .then((workspaceData: any) => {
              setWorkspace(workspaceData);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("User ID not found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!workspace) {
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup  />
      </div>
    );
  } else {
    router.push(`/dashboard/${workspace.id}`);
    return (
      <>
        <AppHeader />
      </>
    );
  }
};

export default DashboardWrapper;