'use client';

import { createContext, ReactNode, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
    accessToken: string;
    children: ReactNode;
}

export const AuthContext = createContext<any>(null);

const AuthProvider = ({
    accessToken,
    children,
}: AuthProviderProps): JSX.Element => {
    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event: any, session: any) => {
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