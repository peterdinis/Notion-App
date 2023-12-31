'use client';

import { createContext, ReactNode, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { AuthChangeEvent } from '@supabase/supabase-js';

interface AuthProviderProps {
    accessToken: string;
    children: ReactNode;
}

export const AuthContext = createContext<AuthProviderProps | null>(null);


const AuthProvider = ({
    accessToken,
    children,
}: AuthProviderProps): JSX.Element => {
    const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
        supabaseKey: process.env
            .NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string,
    });
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription: authListener },
            /* TODO: Kontrola session či funguje neskôr */
        } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
            if (session?.access_token !== accessToken) {
                router.refresh();
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, [accessToken, supabase, router]);

    return <>{children}</>;
};

export default AuthProvider;
