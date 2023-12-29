import { cn } from '@/lib/utils';
import { FC } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getFolders } from '@/supabase/queries/queries';
import WorkspaceDropdown from '../../workspace/WorkspaceDropdown';

interface ISidebarProps {
    params: any;
    className?: string;
}

const Sidebar: FC<ISidebarProps> = async ({
    className,
    params,
}: ISidebarProps) => {
    const supabase = createServerComponentClient(
        { cookies },
        {
            supabaseUrl: process.env
                .NEXT_PUBLIC_SUPABASE_URL as unknown as string,
            supabaseKey: process.env
                .NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string,
        },
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await getFolders(params.workspaceId); // string vs int bug must be fixed

    console.log(data, error);

    return (
        <aside
            className={cn(
                'hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',
                className,
            )}
        >
            <div>
                <WorkspaceDropdown
                    privateWorkspaces={[]}
                    sharedWorkspaces={[]}
                    collaboratingWorkspaces={[]}
                    defaultValue={undefined}
                />
            </div>
        </aside>
    );
};

export default Sidebar;
