import "../styles/style.css";
// import UserProvider from "../context/user-context";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase.js";
import { removeCookies, setCookie } from "cookies-next";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(`Auth state event: ${event}`);
            if (event === "SIGNED_OUT" || event === "USER_DELETED") {
                removeCookies("my-access-token", "my-refresh-token");

                router.push("/login");
            } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
                setCookie("my-access-token", session.access_token, { maxAge });
                setCookie("my-refresh-token", session.refresh_token, { maxAge });
            }
        });
    }, []);

    return <Component {...pageProps} />;
}

export const getServerSideProps = ({ req, res }) => {
    return {
        props: {},
    };
};
