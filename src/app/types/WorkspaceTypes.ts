import { z } from "zod";

export const CreateWorkspaceFormSchema = z.object({
    workspaceName: z.string().describe("Workspace Name").min(1, "Workspace must have one string"),
    logo: z.any()
})