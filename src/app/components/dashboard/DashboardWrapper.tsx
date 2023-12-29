import React from 'react';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import DashboardSetup from './DashboardSetup';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const DashboardWrapper = async () => {
    const supabase = createServerComponentClient({ cookies }, {
        supabaseUrl: 'https://gsydqpkptrrvvtxabbmf.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeWRxcGtwdHJydnZ0eGFiYm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2Njk3NjMsImV4cCI6MjAxOTI0NTc2M30.hm-F3mnVbTN7tQB3Era3XvrFw__klzjfd_FbYItkh14',
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
