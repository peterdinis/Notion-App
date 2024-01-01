'use client';

import { AuthUser } from '@supabase/supabase-js';
import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';

type SupabaseUserContextType = {
    user: AuthUser | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
    user: null,
});

export const useSupabaseUser = () => {
    return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
    children: ReactNode;
}

export const SupabaseUserProvider: FC<SupabaseUserProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const { toast } = useToast();

    const supabase = createClientComponentClient(
        {
            supabaseUrl: process.env
                .NEXT_PUBLIC_SUPABASE_URL as unknown as string,
            supabaseKey: process.env
                .NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string,
        },
    );

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                console.log(user);
                setUser(user);
            }
        };
        getUser();
    }, [supabase, toast]);
    return (
        <SupabaseUserContext.Provider value={{ user }}>
            {children}
        </SupabaseUserContext.Provider>
    );
};
