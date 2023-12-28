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
import { FieldValues, useForm } from "react-hook-form";

interface IDashboardSetupProps {
  user: AuthUser;
}

const DashboardSetup: FC<IDashboardSetupProps> = ({
  user,
}: IDashboardSetupProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState("💼");
  const {register, handleSubmit, reset, formState: {isSubmitting, errors, isLoading}} = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspace: "",
    },
  });
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
                  <Label
                    htmlFor="workspaceName"
                    className="text-sm text-muted-foreground"
                  >
                    <Input
                      id="workspaceName"
                      type="text"
                      placeholder="Worksapce Name"
                      className="bg-transparent"
                      disabled={isLoading}
                      {...register("workspaceName", {
                        required: "Workspace is requeired"
                      })}
                    />
                    <small className="text-red-700">
                      {errors?.workspaceName?.message?.toString()}
                    </small>
                  </Label>
                </div>
              </div>
              <div className="w-full">
                  <Label
                    htmlFor="workspaceLogo"
                    className="text-sm text-muted-foreground"
                  >
                    <Input
                      id="workspaceName"
                      type="file"
                      accept="image/*"
                      placeholder="Worksapce Logo"
                      className="bg-transparent"
                      disabled={isLoading}
                      {...register("workspaceName", {
                        required: "Workspace is requeired"
                      })}
                    />
                    <small className="text-red-700">
                      {errors?.workspaceLogo?.message?.toString()}
                    </small>
                  </Label>
                </div>
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default DashboardSetup;
