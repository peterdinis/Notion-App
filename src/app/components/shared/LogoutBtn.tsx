'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { FC, ReactNode } from 'react';
import { useAppState } from '@/supabase/providers/StateProviders';
import { useRouter } from 'next/navigation';

interface ILogoutBtnProps {
    children?: ReactNode;
}

const LogoutBtn: FC<ILogoutBtnProps> = ({ children }: ILogoutBtnProps) => {
    const router = useRouter();
    const { dispatch } = useAppState();
    const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
        supabaseKey: process.env
            .NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string,
    });

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('ERROR:', error);
        }

        router.refresh();
        dispatch({ type: 'SET_WORKSPACES', payload: { workspaces: [] } });
    }

    return (
        <>
            <Button asChild variant='default' size='lg' onClick={handleSignOut}>
                Sign Out
            </Button>
            {children}
        </>
    );
};

export default LogoutBtn;
