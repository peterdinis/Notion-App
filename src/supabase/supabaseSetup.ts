import {
    createRouteHandlerClient,
    createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseClient = createRouteHandlerClient(
    { cookies },
    {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
        supabaseKey: process.env
            .NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string,
    },
);

export const supabaseServerClient = createServerComponentClient(
    { cookies },
    {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
        supabaseKey: process.env
            .NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string,
    },
);
