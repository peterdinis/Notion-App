"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, useState } from "react";
import { AuthUser } from "@supabase/supabase-js";
import EmojiPicker from "../shared/EmojiComponent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IDashboardSetupProps {
  user: AuthUser;
}

const DashboardSetup: FC<IDashboardSetupProps> = ({
  user,
}: IDashboardSetupProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState("💼");
  return (
    <Card
      className="w-[800px]
      h-screen
      sm:h-auto"
    >
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div
                className="flex
            items-center
            gap-4"
              >
                <div className="text-5xl">
                  <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                    {selectedEmoji}
                  </EmojiPicker>
                </div>
                <div className="w-full">
                    <Label htmlFor="workspaceName"
                    className="text-sm text-muted-foreground">
                        <Input 
                            id="workspaceName"
                            type="text"
                            placeholder="Worksapce Name"
                        />
                    </Label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default DashboardSetup;
