import AppHeader from '@/app/components/shared/AppHeader';
import Sidebar from '@/app/components/shared/sidebar/Sidebar';
import { FC, ReactNode } from 'react';

interface IParamsProps {
    workspaceId: string;
}

interface LayoutProps {
    children: ReactNode;
    params: IParamsProps;
}

const Layout: FC<LayoutProps> = async ({ children, params }) => {
    return (
        <>
            <AppHeader />
            <main className='flex over-hidden h-screen w-screen'>
                <Sidebar params={params} />
                <div className='dark:border-Neutrals/neutrals-12/70 border-l-[1px] w-full relative overflow-scroll'>
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;
