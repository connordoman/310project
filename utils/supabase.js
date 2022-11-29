/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { createClient } from "@supabase/supabase-js";
import { getCookie } from "cookies-next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const setSessionTokens = async (req, res) => {
    const refreshToken = getCookie("my-refresh-token", { req, res });
    const accessToken = getCookie("my-access-token", { req, res });

    if (refreshToken && accessToken) {
        await supabase.auth.setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
        });
        console.log("User logged in");
        return true;
    }
    console.log("User not logged in");
    return false;
};
