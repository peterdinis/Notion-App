"use client"

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { FormSchema } from "@/app/types/AuthTypes";

const LoginForm: FC= () => {
    const router = useRouter();
    
    const [submitError, setSubmitError] = useState<string>("");
    
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async(formData: any) => {

    }

    return (
        <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
            login
        </div>
    )
}

export default LoginForm;