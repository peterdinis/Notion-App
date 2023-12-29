'use server';
import { validate } from 'uuid';
import { db } from '@/lib/db';

export const getFolders = async (workspaceId: string) => {
    const isValid = validate(workspaceId);
    if (!isValid)
        return {
            data: null,
            error: 'Error',
        };

    try {
        const results = await db.folder.findFirst({
            where: {
                workspaceId: workspaceId as unknown as number,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        if(!results) {
            throw new Error("Folders not found");
        }

        return { data: results, error: null };
    } catch (error) {
        return { data: null, error: 'Error' + error };
    }
};

export const getWorkspaceDetail = async (workspaceId: string) => {
    const isValid = validate(workspaceId);
    if (!isValid)
        return {
            data: null,
            error: 'Error',
        };

    try {
        const workspaceDetail = await db.workspace.findFirst({
            where: {
                id: workspaceId as unknown as number
            }
        })

        if(!workspaceDetail) {
            throw new Error("Workspace does not exists");
        }

        return workspaceDetail;
    } catch (err) {
        return {
            data: null,
            error: 'Error' + err,
        };
    }
};

export const getFileDetail = async (fileId: string) => {
    const isValid = validate(fileId);
    if (!isValid)
        return {
            data: null,
            error: 'Error',
        };

    try {
        const fileDetail = await db.files.findFirst({
            where: {
                id: fileId as unknown as number
            }
        })

        if(!fileDetail) {
            throw new Error("Workspace does not exists");
        }

        return fileDetail

    } catch (err) {
        return {
            data: null,
            error: 'Error' + err,
        };
    }
};

export const getPrivateWorkspaces = async(userId: string) =>{
    if (!userId) return [];
    const privateWorkspaces = await db.workspace.findMany({
    });
    return privateWorkspaces;
}