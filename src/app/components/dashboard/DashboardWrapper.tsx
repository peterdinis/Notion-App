import React from 'react';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import DashboardSetup from './DashboardSetup';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from "next/headers";

const DashboardWrapper = async () => {

    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    console.log(user);


    const workspace = await db.workspace.findFirst({
        where: {
            userId: user?.id as unknown as number,
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
