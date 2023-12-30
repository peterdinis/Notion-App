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

    if(!user) return;

    const response = await db.user.findFirst({
        where: {
            id: user?.id
        }
    })

    return (
        <>
        
        </>
    )
};

export default UserCard;
