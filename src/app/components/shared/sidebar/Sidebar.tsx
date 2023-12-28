import { supabaseServerClient } from '@/lib/supabaseSetup';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface ISidebarProps {
    params: any;
    className?: string;
}

const Sidebar: FC<ISidebarProps> = async ({
    params,
    className,
}: ISidebarProps) => {
    const supabase = supabaseServerClient;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    return (
        <aside
            className={cn(
                'hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',
                className,
            )}
        ></aside>
    );
};

export default Sidebar;
