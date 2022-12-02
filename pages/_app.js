import "/public/styles/style.css";
// import UserProvider from "../context/user-context";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChange } from "/public/utils/supabase.js";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        let redirectPolicy = onAuthStateChange();
        if (redirectPolicy.redirect) {
            router.redirect(redirectPolicy.redirect);
        }
    }, []);

    return <Component {...pageProps} />;
}
