import { FC } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import LogoutBtn from '../shared/LogoutBtn';

const UserCard: FC = () => {
    return <></>;
};

export default UserCard;
