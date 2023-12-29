import React from 'react';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import DashboardSetup from './DashboardSetup';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const DashboardWrapper = async () => {
    const supabase = createServerComponentClient({ cookies }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string
    });
    
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    console.log(user);

    const workspace = await db.workspace.findFirst({
        where: {
            userId: user?.id
        },
    });

    if (!workspace)
        return (
            <div
                className='bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  '
            >
                <DashboardSetup user={user!} />
            </div>
        );

    redirect(`/dashboard/${workspace.id}`);
};

export default DashboardWrapper;
