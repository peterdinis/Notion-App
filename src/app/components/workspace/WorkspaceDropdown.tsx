'use client';

import { useAppState } from '@/supabase/providers/StateProviders';
import { FC, useState, useEffect } from 'react';
import SelectedWorkspace from './SelectedWorkspace';
import WorkspaceCreator from './Creator';
import CustomDialogTrigger from '../shared/CustomDialog';

interface WorkspaceDropdownProps {
    privateWorkspaces: any[] | [];
    sharedWorkspaces: any[] | [];
    collaboratingWorkspaces: any[] | [];
    defaultValue: any | undefined;
}

const WorkspaceDropdown: FC<WorkspaceDropdownProps> = ({
    privateWorkspaces,
    collaboratingWorkspaces,
    sharedWorkspaces,
    defaultValue,
}) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const { dispatch, state } = useAppState();

    useEffect(() => {
        if (!state.workspaces.length) {
            dispatch({
                type: 'SET_WORKSPACES',
                payload: {
                    workspaces: [
                        ...privateWorkspaces,
                        ...sharedWorkspaces,
                        ...collaboratingWorkspaces,
                    ].map((workspace) => ({ ...workspace, folders: [] })),
                },
            });
        }
    }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);

    const handleSelect = (option: Workspace) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const findSelectedWorkspace = state.workspaces.find(
            (workspace) => workspace.id === defaultValue?.id,
        );
        if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
    }, [state, defaultValue]);

    return (
        <div
            className=' relative inline-block
        text-left
    '
        >
            <div>
                <span onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption ? (
                        <SelectedWorkspace workspace={selectedOption} />
                    ) : (
                        'Select a workspace'
                    )}
                </span>
            </div>
            {isOpen && (
                <div
                    className='origin-top-right
            absolute
            w-full
            rounded-md
            shadow-md
            z-50
            h-[190px]
            bg-black/10
            backdrop-blur-lg
            group
            overflow-scroll
            border-[1px]
            border-muted
        '
                >
                    <div className='rounded-md flex flex-col'>
                        <div className='!p-2'>
                            {!!privateWorkspaces.length && (
                                <>
                                    <p className='text-muted-foreground'>
                                        Private
                                    </p>
                                    <hr></hr>
                                    {privateWorkspaces.map((option) => (
                                        <SelectedWorkspace
                                            key={option.id}
                                            workspace={option}
                                            onClick={handleSelect}
                                        />
                                    ))}
                                </>
                            )}
                            {!!sharedWorkspaces.length && (
                                <>
                                    <p className='text-muted-foreground'>
                                        Shared
                                    </p>
                                    <hr />
                                    {sharedWorkspaces.map((option) => (
                                        <SelectedWorkspace
                                            key={option.id}
                                            workspace={option}
                                            onClick={handleSelect}
                                        />
                                    ))}
                                </>
                            )}
                            {!!collaboratingWorkspaces.length && (
                                <>
                                    <p className='text-muted-foreground'>
                                        Collaborating
                                    </p>
                                    <hr />
                                    {collaboratingWorkspaces.map((option) => (
                                        <SelectedWorkspace
                                            key={option.id}
                                            workspace={option}
                                            onClick={handleSelect}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                        <CustomDialogTrigger
                            header='Create A Workspace'
                            content={<WorkspaceCreator />}
                            description='Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too.'
                        >
                            <div
                                className='flex 
                transition-all 
                hover:bg-muted 
                justify-center 
                items-center 
                gap-2 
                p-2 
                w-full'
                            >
                                <article
                                    className='text-slate-500 
                  rounded-full
                   bg-slate-800 
                   w-4 
                   h-4 
                   flex 
                   items-center 
                   justify-center'
                                >
                                    +
                                </article>
                                Create workspace
                            </div>
                        </CustomDialogTrigger>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspaceDropdown;
