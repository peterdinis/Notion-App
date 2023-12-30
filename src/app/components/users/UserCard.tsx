import { FC } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { LogOut } from 'lucide-react';
import LogoutBtn from '../shared/LogoutBtn';
import ModeToggle from '../shared/ModeToggle';

const UserCard: FC = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const response = await db.user.findFirst({
        where: {
            id: user?.id,
        },
    });

    const profile = {
        ...response,
    };

    return (
        <article
            className='hidden
        sm:flex 
        justify-between 
        items-center 
        px-4 
        py-2 
        dark:bg-Neutrals/neutrals-12
        rounded-3xl
    '
        >
            <aside className='flex justify-center items-center gap-2'>
                <div className='flex flex-col'>
                    <small
                        className='w-[100px] 
            overflow-hidden 
            overflow-ellipsis
            '
                    >
                        {profile.email}
                    </small>
                </div>
            </aside>
            <div className='flex items-center justify-center'>
                <LogOut />
                <LogoutBtn />
                <ModeToggle />
            </div>
        </article>
    );
};

export default UserCard;
