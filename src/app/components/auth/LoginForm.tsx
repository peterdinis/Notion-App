'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/types/AuthTypes';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabaseClient } from '@/supabase/supabaseSetup';

const LoginForm: FC = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [submitError, setSubmitError] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        formData,
    ) => {
        try {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) {
                console.log(error);
            }

            toast({
                variant: 'default',
                duration: 2000,
                className: 'bg-green-300',
                title: 'Successfully login to app',
            });
            router.push('/dashboard');
        } catch (err) {
            toast({
                variant: 'default',
                duration: 2000,
                className: 'bg-red-300',
                title: 'Login failed try again',
            });
            console.log(err);
        }
    };

    return (
        <div className='min-h-full flex justify-center align-top dark:bg-[#1F1F1F]'>
            <Form {...form}>
                <form
                    onChange={() => {
                        if (submitError) setSubmitError('');
                    }}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'
                >
                    <Link
                        href='/'
                        className='
            w-full
            flex
            justify-left
            items-center'
                    >
                        <span
                            className='font-semibold
            dark:text-white text-4xl first-letter:ml-2'
                        >
                            Notion
                        </span>
                    </Link>
                    <FormDescription
                        className='
          text-foreground/60  dark:text-white'
                    >
                        An all-In-One Collaboration and Productivity Platform
                    </FormDescription>
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='email'
                                        placeholder='Email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {submitError && <FormMessage>{submitError}</FormMessage>}
                    <Button
                        type='submit'
                        className='w-full p-6'
                        size='lg'
                        disabled={isLoading}
                    >
                        {!isLoading ? 'Login' : <Loader />}
                    </Button>
                    <span className='self-container  dark:text-white'>
                        Dont have an account?{' '}
                        <Link href='/register' className='text-primary'>
                            Sign Up
                        </Link>
                    </span>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
