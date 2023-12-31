'use client';

import { FC, useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { v4 } from 'uuid';
import Dropdown from './Dropdown';
import { useToast } from '@/components/ui/use-toast';
import useSupabaseRealtime from '@/hooks/useSupabaseRealtime';
import { useAppState } from '@/supabase/providers/StateProviders';
import { useSupabaseUser } from '@/supabase/providers/UserProvider';
import { createFolder } from '@/supabase/queries/queries';
import { Accordion } from '@radix-ui/react-accordion';
import TooltipComponent from '../TooltipComponent';

interface FoldersDropdownListProps {
    workspaceFolders: any[];
    workspaceId: string;
}

const FoldersDropdownList: FC<FoldersDropdownListProps> = ({
    workspaceFolders,
    workspaceId,
}) => {
    useSupabaseRealtime();
    const { state, dispatch, folderId } = useAppState();
    const { toast } = useToast();
    const [folders, setFolders] = useState(workspaceFolders);

    //effec set nitial satte server app state
    useEffect(() => {
        if (workspaceFolders.length > 0) {
            dispatch({
                type: 'SET_FOLDERS',
                payload: {
                    workspaceId,
                    folders: workspaceFolders.map((folder) => ({
                        ...folder,
                        files:
                            state.workspaces
                                .find(
                                    (workspace) => workspace.id === workspaceId,
                                )
                                ?.folders.find((f) => f.id === folder.id)
                                ?.files || [],
                    })),
                },
            });
        }
    }, [workspaceFolders, workspaceId]);
    //state

    useEffect(() => {
        return setFolders(
            state.workspaces.find((workspace) => workspace.id === workspaceId)
                ?.folders || []
        );
    }, [state]);

    //add folder
    const addFolderHandler = async () => {
        const newFolder= {
            data: null,
            id: v4(),
            createdAt: new Date().toISOString(),
            title: 'Untitled',
            iconId: '📄',
            inTrash: null,
            workspaceId,
            bannerUrl: '',
        } as any;
        dispatch({
            type: 'ADD_FOLDER',
            payload: { workspaceId, folder: { ...newFolder, files: [] } as any },
        });
        const {error } = await createFolder(newFolder);
        if (error) {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: 'Could not create the folder',
            });
        } else {
            toast({
                title: 'Success',
                description: 'Created folder.',
            });
        }
    };

    return (
        <>
            <div
                className='flex
        sticky 
        z-20 
        top-0 
        bg-background 
        w-full  
        h-10 
        group/title 
        justify-between 
        items-center 
        pr-4 
        text-Neutrals/neutrals-8
  '
            >
                <span
                    className='text-Neutrals-8 
        font-bold 
        text-xs'
                >
                    FOLDERS
                </span>
                <TooltipComponent message='Create Folder'>
                    <PlusIcon
                        onClick={addFolderHandler}
                        size={16}
                        className='group-hover/title:inline-block
            hidden 
            cursor-pointer
            hover:dark:text-white
          '
                    />
                </TooltipComponent>
            </div>
            <Accordion
                type='multiple'
                defaultValue={[folderId || '']}
                className='pb-20'
            >
                {folders
                    .filter((folder) => !folder.inTrash)
                    .map((folder) => (
                        <Dropdown
                            key={folder.id}
                            title={folder.title}
                            listType='folder'
                            id={folder.id as any} iconId={''}                        />
                    ))}
            </Accordion>
        </>
    );
};

export default FoldersDropdownList;
