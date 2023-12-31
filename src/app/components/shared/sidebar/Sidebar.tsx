import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { FC } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import {
    getCollaboratingWorkspaces,
    getFolders,
    getPrivateWorkspaces,
    getSharedWorkspaces,
} from '@/supabase/queries/queries';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import UserCard from '../../users/UserCard';
import WorkspaceDropdown from '../../workspace/WorkspaceDropdown';
import FoldersDropdownList from './FoldersDropdown';
import NativeNavigation from './NativeNavigation';
interface SidebarProps {
    params: { workspaceId: string };
    className?: string;
}

const Sidebar: FC<SidebarProps> = async ({ params, className }) => {
    const supabase = createServerComponentClient({ cookies });
    //user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    //folders
    const workspaceFolderData = await getFolders(params.workspaceId);
    //error
    if (!workspaceFolderData) redirect('/dashboard');

    const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
        await Promise.all([
            getPrivateWorkspaces(user.id),
            getCollaboratingWorkspaces(user.id),
            getSharedWorkspaces(user.id),
        ]);

    return (
        <aside
            className={twMerge(
                'hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',
                className,
            )}
        >
            <div>
                <WorkspaceDropdown
                    privateWorkspaces={privateWorkspaces}
                    sharedWorkspaces={sharedWorkspaces}
                    collaboratingWorkspaces={collaboratingWorkspaces}
                    defaultValue={[
                        ...privateWorkspaces,
                        ...collaboratingWorkspaces,
                        ...sharedWorkspaces,
                    ].find((workspace) => workspace.id === params.workspaceId)}
                />
                <NativeNavigation myWorkspaceId={params.workspaceId} />
                <ScrollArea
                    className='overflow-scroll relative
          h-[450px]
        '
                >
                    <div
                        className='pointer-events-none 
          w-full 
          absolute 
          bottom-0 
          h-20 
          bg-gradient-to-t 
          from-background 
          to-transparent 
          z-40'
                    />
                    <FoldersDropdownList
                        workspaceFolders={workspaceFolderData || []}
                        workspaceId={params.workspaceId}
                    />
                </ScrollArea>
            </div>
            <UserCard />
        </aside>
    );
};

export default Sidebar;
