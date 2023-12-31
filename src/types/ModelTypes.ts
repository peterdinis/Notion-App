interface User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    workspaces: Workspace[];
    collaborators: Collaborator[];
}

interface Workspace {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    icon: string;
    data: string;
    inTrash: string;
    logo: string | null;
    bannerUrl: string;
    folders: Folder[];
    user: User;
    userId: string;
    collaborators: Collaborator[];
}

interface Folder {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    icon: string;
    data: string;
    inTrash: string;
    logo: string | null;
    bannerUrl: string;
    workspace: Workspace;
    workspaceId: number;
    files: Files[];
}

interface Files {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    icon: string;
    data: string;
    inTrash: string;
    logo: string | null;
    bannerUrl: string;
    folder: Folder;
    folderId: number;
}

interface Collaborator {
    id: string;
    workspace: Workspace;
    workspaceId: number;
    createdAt: Date;
    user: User;
    userId: string;
}
