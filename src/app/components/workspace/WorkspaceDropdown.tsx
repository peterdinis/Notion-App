'use client';

import { FC, useState } from 'react';

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

    return <></>;
};

export default WorkspaceDropdown;
