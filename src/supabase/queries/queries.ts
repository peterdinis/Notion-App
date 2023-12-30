'use server';
import { validate } from 'uuid';
import { db } from '@/lib/db';

export const createWorkspace = async (workspace: any) => {
    try {
        return await db.workspace.create({
            data: {
                workspace,
            } as any,
        });
    } catch (error) {
        throw new Error(`Error creating workspace: ${error}`);
    }
};

export const deleteWorkspace = async (workspaceId: string) => {
    try {
        if (!workspaceId) return;

        await db.workspace.delete({
            where: {
                id: workspaceId,
            },
        });
    } catch (error) {
        throw new Error(`Error deleting workspace: ${error}`);
    }
};

export const getFolders = async (workspaceId: string) => {
    try {
        return await db.folder.findMany({
            where: {
                workspaceId,
            },
        });
    } catch (error) {
        throw new Error(`Error fetching folders: ${error}`);
    }
};

export const getWorkspaceDetails = async (workspaceId: string) => {
    try {
        return await db.workspace.findUnique({
            where: {
                id: workspaceId,
            },
        });
    } catch (error) {
        throw new Error(`Error fetching workspace details: ${error}`);
    }
};

export const getFileDetails = async (fileId: string) => {
    try {
        return await db.files.findUnique({
            where: {
                id: fileId,
            },
        });
    } catch (error) {
        throw new Error(`Error fetching file details: ${error}`);
    }
};

export const deleteFile = async (fileId: string) => {
    try {
        if (!fileId) return;

        await db.files.delete({
            where: {
                id: fileId,
            },
        });
    } catch (error) {
        throw new Error(`Error deleting file: ${error}`);
    }
};

export const deleteFolder = async (folderId: string) => {
    try {
        if (!folderId) return;

        await db.folder.delete({
            where: {
                id: folderId,
            },
        });
    } catch (error) {
        throw new Error(`Error deleting folder: ${error}`);
    }
};

export const getFolderDetails = async (folderId: string) => {
    try {
        const folder = await db.folder.findUnique({
            where: {
                id: folderId,
            },
        });

        if (!folder) {
            return { data: [], error: 'Folder not found' };
        }

        return { data: [folder], error: null };
    } catch (error) {
        throw new Error(`Error fetching folder details: ${error}`);
    }
};

export const getPrivateWorkspaces = async (userId: string) => {
    try {
        return await db.workspace.findMany({
            where: {
                userId: {
                    equals: userId,
                },
                access: 'private',
            } as any,
        });
    } catch (error) {
        throw new Error(`Error fetching private workspaces: ${error}`);
    }
};

export const getCollaboratingWorkspaces = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                workspaces: {
                    where: {
                        access: 'collaborate',
                    },
                },
            } as any,
        });

        return user?.workspaces || [];
    } catch (error) {
        throw new Error(`Error fetching collaborating workspaces: ${error}`);
    }
};

export const getSharedWorkspaces = async (userId: string) => {
    try {
        return await db.workspace.findMany({
            where: {
                collaborators: {
                    some: {
                        userId: {
                            equals: userId,
                        },
                    },
                },
            },
        });
    } catch (error) {
        throw new Error(`Error fetching shared workspaces: ${error}`);
    }
};

export const getFiles = async (folderId: string) => {
    try {
        return await db.files.findMany({
            where: {
                folderId: {
                    equals: folderId,
                },
            },
        });
    } catch (error) {
        throw new Error(`Error fetching files: ${error}`);
    }
};

export const addCollaborators = async (users: any[], workspaceId: string) => {
    try {
        const workspace = await db.workspace.findUnique({
            where: {
                id: workspaceId,
            },
        });

        if (!workspace) {
            throw new Error('Workspace not found');
        }

        const updatedWorkspace = await db.workspace.update({
            where: {
                id: workspaceId,
            },
            data: {
                collaborators: {
                    connect: users.map((user) => ({ id: user.id })),
                },
            },
        });

        return updatedWorkspace;
    } catch (error) {
        throw new Error(`Error adding collaborators: ${error}`);
    }
};

export const removeCollaborators = async (
    users: any[],
    workspaceId: string,
) => {
    try {
        const updatedWorkspace = await db.workspace.update({
            where: {
                id: workspaceId,
            },
            data: {
                collaborators: {
                    disconnect: users.map((user) => ({ id: user.id })),
                },
            },
        });

        return updatedWorkspace;
    } catch (error) {
        throw new Error(`Error removing collaborators: ${error}`);
    }
};

export const findUser = async (userId: string) => {
    try {
        return await db.user.findUnique({
            where: {
                id: userId,
            },
        });
    } catch (error) {
        throw new Error(`Error finding user: ${error}`);
    }
};

export const createFolder = async (folder: any) => {
    try {
        await db.folder.create({
            data: folder,
        });
        return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: 'Error' };
    }
};

export const createFile = async (file: any) => {
    try {
        await db.files.create({
            data: file,
        });
        return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: 'Error' };
    }
};

export const updateFolder = async (folder: any, folderId: string) => {
    try {
        await db.folder.update({
            where: {
                id: folderId,
            },
            data: folder,
        });
        return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: 'Error' };
    }
};

export const updateFile = async (file: any, fileId: string) => {
    try {
        await db.files.update({
            where: {
                id: fileId,
            },
            data: file,
        });
        return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: 'Error' };
    }
};

export const updateWorkspace = async (workspace: any, workspaceId: string) => {
    try {
        await db.workspace.update({
            where: {
                id: workspaceId,
            },
            data: workspace,
        });
        return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: 'Error' };
    }
};

export const getCollaborators = async (workspaceId: string) => {
    try {
        const collaborators = await db.collaborator.findMany({
            where: {
                workspaceId: workspaceId,
            },
            include: {
                user: true,
            },
        });
        return collaborators.map((collaborator) => collaborator.user);
    } catch (error) {
        throw new Error(`Error getting collaborators: ${error}`);
    }
};

export const getUsersFromSearch = async (email: string) => {
    try {
        if (!email) return [];
        return await db.user.findMany({
            where: {
                email: {
                    startsWith: email,
                },
            },
        });
    } catch (error) {
        throw new Error(`Error getting users from search: ${error}`);
    }
};
