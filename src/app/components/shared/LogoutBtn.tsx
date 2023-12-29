'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

const LogoutBtn: FC = () => {
    const supabase = createClientComponentClient();

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('ERROR:', error);
        }
    }

    return (
        <Button variant='default' size='lg' onClick={handleSignOut}>
            Sign Out
        </Button>
    );
};

export default LogoutBtn;