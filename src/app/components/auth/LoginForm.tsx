"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/app/types/AuthTypes";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { loginUser } from "@/actions/authActions";

const LoginForm: FC = () => {
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    try {
      loginUser(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err) {
      setSubmitError(err as unknown as string);
    }
  };

  return (
    <div className="min-h-full flex justify-center align-top dark:bg-[#1F1F1F]">
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) setSubmitError("");
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
        >
          <Link
            href="/"
            className="
            w-full
            flex
            justify-left
            items-center"
          >
            <span
              className="font-semibold
            dark:text-white text-4xl first-letter:ml-2"
            >
              Notion
            </span>
          </Link>
          <FormDescription
            className="
          text-foreground/60  dark:text-white"
          >
            An all-In-One Collaboration and Productivity Platform
          </FormDescription>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type="submit"
            className="w-full p-6"
            size="lg"
            disabled={isLoading}
          >
            {!isLoading ? "Login" : <Loader />}
          </Button>
          <span className="self-container  dark:text-white">
            Dont have an account?{" "}
            <Link href="/signup" className="text-primary">
              Sign Up
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
