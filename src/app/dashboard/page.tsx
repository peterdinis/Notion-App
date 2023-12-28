import { NextPage } from "next";
import DashboardWrapper from "../components/dashboard/DashboardWrapper";
import { supabaseServerClient } from "@/lib/supabaseSetup";

const DashboardPage: NextPage = async () => {
    
    const supabase = supabaseServerClient;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    return (
        <>
        abc
            <DashboardWrapper />    
        </>
    )
}

export default DashboardPage;