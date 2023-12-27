"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo, useState } from "react";
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
import clsx from "clsx";
import { registerUser } from "@/actions/authActions";
import { useToast } from "@/components/ui/use-toast";

const RegisterForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const { toast } = useToast();
  const constExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmSpecialStyles = useMemo(() => {
    clsx("bg-primary", {
      "bg-red-500/10": constExchangeError,
      "border-red-500/50": constExchangeError,
      "text-red-700": constExchangeError,
    });
  }, []);

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
      registerUser(formData.email, formData.password);
      toast({
        variant: "default",
        duration: 2000,
        className: "bg-green-300",
        title: "Successfully register to app",
      });
      router.push("/login");
    } catch (err) {
      toast({
        variant: "default",
        duration: 2000,
        className: "bg-red-300",
        title: "register failed try again",
      });
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
            {!isLoading ? "Register" : <Loader />}
          </Button>
          <span className="self-container  dark:text-white">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
