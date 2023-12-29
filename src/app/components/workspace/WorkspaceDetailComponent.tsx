import { FC } from "react";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutBtn from "../shared/LogoutBtn";

const WorkspaceDetailComponent: FC = async ()=> {
    const supabase = createServerComponentClient({ cookies }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            <h3>{user?.email}</h3>
            <LogoutBtn />
        </>
    )
}

export default WorkspaceDetailComponent;