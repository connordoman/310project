/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { createClient } from "@supabase/supabase-js";
import { getCookie, setCookie, removeCookies, deleteCookie } from "cookies-next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const checkLoginStatus = async (req, res) => {
    const refreshToken = getCookie("my-refresh-token", { req, res });
    const accessToken = getCookie("my-access-token", { req, res });

    if (refreshToken && accessToken) {
        let { error } = await supabase.auth.setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
        });
        if (error) {
            console.log("Error setting session: ", error);
            return false;
        }
        console.log("User logged in");
        return true;
    }
    console.log("User not logged in");
    return false;
};

export const getUser = async (req, res) => {
    const loggedIn = await checkLoginStatus(req, res);
    // console.log("Logged in:", loggedIn);

    if (loggedIn) {
        const {
            data: { user: authUser },
            error,
        } = await supabase.auth.getUser();

        if (error) {
            console.error("Error authorizing user", error);
            return false;
        }

        // console.log(`Auth user: ${JSON.stringify(authUser)}`);

        const { data: userProfile, error: err } = await supabase
            .from("user_staff")
            .select("*")
            .eq("id", authUser.id)
            .single();

        if (err || !userProfile) {
            if (err) console.error("Error getting user profile", err);
            console.error("No user profile found");
        }

        // console.log(`User: ${userProfile}`);

        if (userProfile) return userProfile;
    }

    console.error("Can't get user: not logged in");
    return false;
};

export const onAuthStateChange = async () => {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log(`Auth state event: ${event}`);
        if (event === "SIGNED_OUT" || event === "USER_DELETED") {
            clearCookies();

            return { redirect: "/login" };
        } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            prepareCookies(session);

            return { redirect: false };
        }
    });
};

export const prepareCookies = (session) => {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
    setCookie("my-access-token", session.access_token, { maxAge, sameSite: "lax" });
    setCookie("my-refresh-token", session.refresh_token, { maxAge, sameSite: "lax" });
};

export const clearCookies = () => {
    deleteCookie("my-access-token");
    deleteCookie("my-refresh-token");
};

export const getUserProfileOrRedirect = async (req, res, loggedInRedirect) => {
    // returns user information
    let user = await getUser(req, res);

    const { error, data: profile } = await supabase.from("user_staff").select("*").eq("id", user.id).single();

    // redirect to login if no user
    if (!user || error) {
        if (error) console.error(JSON.stringify(error, null, 4));
        return {
            props: {},
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    // redirect to alt route
    if (loggedInRedirect) {
        return {
            props: { user, profile },
            redirect: {
                destination: loggedInRedirect,
                permanent: false,
            },
        };
    }

    // advance to protected page
    return {
        props: { user, profile },
    };
};

export const createErrorSuccessURL = (url, error, success) => {
    let newURL = url;
    if (newURL[newURL.length - 1] !== "/") newURL += "/";
    if (error) newURL += `?error=${encodeURIComponent(error)}`;
    if (success) newURL += `&success=${encodeURIComponent(success)}`;
    return newURL;
};

export const redirectIfLoggedIn = async (req, res, redirectTo = "/", error = "", success = "") => {
    let loggedIn = await checkLoginStatus(req, res);

    let redirectUrl = createErrorSuccessURL(redirectTo, error, success);

    if (loggedIn) {
        return {
            props: {},
            redirect: {
                destination: redirectUrl,
                permanent: false,
            },
        };
    }

    return {
        props: { user: await getUser(req, res) },
    };
};
