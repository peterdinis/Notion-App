'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    AlertDialogHeader,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAppState } from '@/supabase/providers/StateProviders';
import { useSupabaseUser } from '@/supabase/providers/UserProvider';
import {
    addCollaborators,
    deleteWorkspace,
    getCollaborators,
    removeCollaborators,
    updateWorkspace,
} from '@/supabase/queries/queries';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction,
} from '@radix-ui/react-alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Label } from '@radix-ui/react-label';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import {
    Separator,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@radix-ui/react-select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
    Briefcase,
    Share,
    Plus,
    UserIcon,
    LogOut,
    CreditCard,
    Lock,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import LogoutBtn from '../shared/LogoutBtn';
import CollaboratorSearch from '../collaboators/CollboatorsSearch';

const SettingsForm: FC = () => {
    const { toast } = useToast();
    const { user } = useSupabaseUser();
    const router = useRouter();
    const supabase = createClientComponentClient();
    const { state, workspaceId, dispatch } = useAppState();
    const [permissions, setPermissions] = useState('private');
    const [collaborators, setCollaborators] = useState<User[] | []>([]);
    const [openAlertMessage, setOpenAlertMessage] = useState(false);
    const [workspaceDetails, setWorkspaceDetails] = useState<Workspace>();
    const titleTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [loadingPortal, setLoadingPortal] = useState(false);

    //remove collaborators
    const removeCollaborator = async (user: User) => {
        if (!workspaceId) return;
        if (collaborators.length === 1) {
            setPermissions('private');
        }
        await removeCollaborators([user], workspaceId);
        setCollaborators(
            collaborators.filter((collaborator) => collaborator.id !== user.id),
        );
        router.refresh();
    };

    //on change
    const workspaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!workspaceId || !e.target.value) return;
        dispatch({
            type: 'UPDATE_WORKSPACE',
            payload: { workspace: { title: e.target.value }, workspaceId },
        });
        if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    };

    const onChangeWorkspaceLogo = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!workspaceId) return;
        const file = e.target.files?.[0];
        if (!file) return;
        const uuid = v4();
        setUploadingLogo(true);
        const { data, error } = await supabase.storage
            .from('workspace-logos')
            .upload(`workspaceLogo.${uuid}`, file, {
                cacheControl: '3600',
                upsert: true,
            });

        if (!error) {
            dispatch({
                type: 'UPDATE_WORKSPACE',
                payload: { workspace: { logo: data.path }, workspaceId },
            });
            await updateWorkspace({ logo: data.path }, workspaceId);
            setUploadingLogo(false);
        }
    };

    const onClickAlertConfirm = async () => {
        if (!workspaceId) return;
        if (collaborators.length > 0) {
            await removeCollaborators(collaborators, workspaceId);
        }
        setPermissions('private');
        setOpenAlertMessage(false);
    };

    const onPermissionsChange = (val: string) => {
        if (val === 'private') {
            setOpenAlertMessage(true);
        } else setPermissions(val);
    };

    useEffect(() => {
        const showingWorkspace = state.workspaces.find(
            (workspace) => workspace.id === workspaceId,
        ) as any;
        if (showingWorkspace) setWorkspaceDetails(showingWorkspace);
    }, [workspaceId, state]);

    useEffect(() => {
        if (!workspaceId) return;
        const fetchCollaborators = async () => {
            const response = (await getCollaborators(workspaceId)) as any;
            if (response.length) {
                setPermissions('shared');
                setCollaborators(response);
            }
        };
        fetchCollaborators();
    }, [workspaceId]);

    return (
        <div className='flex gap-4 flex-col'>
            <p className='flex items-center gap-2 mt-6'>
                <Briefcase size={20} />
                Workspace
            </p>
            <Separator />
            <div className='flex flex-col gap-2'>
                <Label
                    htmlFor='workspaceName'
                    className='text-sm text-muted-foreground'
                >
                    Name
                </Label>
                <Input
                    name='workspaceName'
                    value={workspaceDetails ? workspaceDetails.title : ''}
                    placeholder='Workspace Name'
                    onChange={workspaceNameChange}
                />
                <Label
                    htmlFor='workspaceLogo'
                    className='text-sm text-muted-foreground'
                >
                    Workspace Logo
                </Label>
                <Input
                    name='workspaceLogo'
                    type='file'
                    accept='image/*'
                    placeholder='Workspace Logo'
                    onChange={onChangeWorkspaceLogo}
                />
            </div>
            <>
                <Label htmlFor='permissions'>Permissions</Label>
                <Select onValueChange={onPermissionsChange} value={permissions}>
                    <SelectTrigger className='w-full h-26 -mt-3'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='private'>
                                <div
                                    className='p-2
                  flex
                  gap-4
                  justify-center
                  items-center
                '
                                >
                                    <Lock />
                                    <article className='text-left flex flex-col'>
                                        <span>Private</span>
                                        <p>
                                            Your workspace is private to you.
                                            You can choose to share it later.
                                        </p>
                                    </article>
                                </div>
                            </SelectItem>
                            <SelectItem value='shared'>
                                <div className='p-2 flex gap-4 justify-center items-center'>
                                    <Share></Share>
                                    <article className='text-left flex flex-col'>
                                        <span>Shared</span>
                                        <span>
                                            You can invite collaborators.
                                        </span>
                                    </article>
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {permissions === 'shared' && (
                    <div>
                        <CollaboratorSearch
                            existingCollaborators={collaborators}
                            getCollaborator={(user) => {
                                addCollaborators(user);
                            }}
                        >
                            <Button type='button' className='text-sm mt-4'>
                                <Plus />
                                Add Collaborators
                            </Button>
                        </CollaboratorSearch>
                        <div className='mt-4'>
                            <span className='text-sm text-muted-foreground'>
                                Collaborators {collaborators.length || ''}
                            </span>
                            <ScrollArea
                                className='
            h-[120px]
            overflow-y-scroll
            w-full
            rounded-md
            border
            border-muted-foreground/20'
                            >
                                {collaborators.length ? (
                                    collaborators.map((c) => (
                                        <div
                                            className='p-4 flex
                      justify-between
                      items-center
                '
                                            key={c.id}
                                        >
                                            <div className='flex gap-4 items-center'>
                                                <Avatar>
                                                    <AvatarImage src='/avatars/7.png' />
                                                    <AvatarFallback>
                                                        PJ
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className='text-sm 
                          gap-2
                          text-muted-foreground
                          overflow-hidden
                          overflow-ellipsis
                          sm:w-[300px]
                          w-[140px]
                        '
                                                >
                                                    {c.email}
                                                </div>
                                            </div>
                                            <Button
                                                variant='secondary'
                                                onClick={() =>
                                                    removeCollaborator(c)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className='absolute
                  right-0 left-0
                  top-0
                  bottom-0
                  flex
                  justify-center
                  items-center
                '
                                    >
                                        <span className='text-muted-foreground text-sm'>
                                            You have no collaborators
                                        </span>
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>
                )}
                <Alert variant={'destructive'}>
                    <AlertDescription>
                        Warning! deleting you workspace will permanantly delete
                        all data related to this workspace.
                    </AlertDescription>
                    <Button
                        type='submit'
                        size={'sm'}
                        variant={'destructive'}
                        className='mt-4 
            text-sm
            bg-destructive/40 
            border-2 
            border-destructive'
                        onClick={async () => {
                            if (!workspaceId) return;
                            await deleteWorkspace(workspaceId);
                            toast({
                                title: 'Successfully deleted your workspae',
                            });
                            dispatch({
                                type: 'DELETE_WORKSPACE',
                                payload: workspaceId,
                            });
                            router.replace('/dashboard');
                        }}
                    >
                        Delete Workspace
                    </Button>
                </Alert>
                <p className='flex items-center gap-2 mt-6'>
                    <UserIcon size={20} /> Profile
                </p>
                <Separator />
                <div className='flex items-center'>
                    <Avatar>
                        <AvatarImage src={''} />
                        <AvatarFallback>TEST</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col ml-6'>
                        <small className='text-muted-foreground cursor-not-allowed'>
                            {user ? user.email : ''}
                        </small>
                        <Label
                            htmlFor='profilePicture'
                            className='text-sm text-muted-foreground'
                        >
                            Profile Picture
                        </Label>
                        <Input
                            name='profilePicture'
                            type='file'
                            accept='image/*'
                            placeholder='Profile Picture'
                            disabled={uploadingProfilePic}
                        />
                    </div>
                </div>
                <LogoutBtn />
                <div className='flex items-center'>
                    <LogOut />
                </div>
                <p className='flex items-center gap-2 mt-6'>
                    <CreditCard size={20} /> Billing & Plan
                </p>
            </>
            <AlertDialog open={openAlertMessage}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDescription>
                            Changing a Shared workspace to a Private workspace
                            will remove all collaborators permanantly.
                        </AlertDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setOpenAlertMessage(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={onClickAlertConfirm}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SettingsForm;
