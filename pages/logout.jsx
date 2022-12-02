/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect } from "react";
import { supabase } from "/public/utils/supabase.js";
import { useRouter } from "next/router";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { clearCookies, getUserProfileOrRedirect } from "../public/utils/supabase";

const Logout = () => {
    const router = useRouter();
    const [signedOut, setSignedOut] = useState(false);

    useEffect(() => {
        const signOut = async () => {
            try {
                clearCookies();
                const { error } = await supabase.auth.signOut();

                if (error) throw error;
            } catch (err) {
                console.error(err);
            } finally {
                setSignedOut(true);
            }
        };
        signOut();
    }, []);

    useEffect(() => {
        if (signedOut) {
            router.push({ pathname: "/", query: { success: encodeURIComponent("You have been signed out.") } });
        }
    }, [signedOut]);

    return (
        <Content title="Log Out">
            <TextColumn>
                <h1>Logging out...</h1>
            </TextColumn>
        </Content>
    );
};

export default Logout;
