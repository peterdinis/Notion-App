'use client';

import { Button } from '@/components/ui/button';
import { FC, ReactNode } from 'react';

interface ILogoutBtnProps {
    children?: ReactNode;
}

const LogoutBtn: FC<ILogoutBtnProps> = ({ children }: ILogoutBtnProps) => {
    return (
        <>
            <Button asChild variant='default' size='lg'>
                Sign Out
            </Button>
            {children}
        </>
    );
};

export default LogoutBtn;
