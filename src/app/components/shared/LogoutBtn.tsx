'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

const LogoutBtn: FC = () => {
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
    }

    return (
        <Button asChild variant='default' size='lg' onClick={handleSignOut}>
            Sign Out
        </Button>
    );
};

export default LogoutBtn;
