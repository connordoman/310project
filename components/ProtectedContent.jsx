/*
 * Created on Wed Nov 30 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { getUser } from "/public/utils/supabase.js";
import Content from "./Content";
import InfoBar from "./InfoBar";
import { useRouter } from "next/router";

export const ProtectedContent = ({ user, title, children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (user) {
            console.log(`ProtectedContent: User is logged in as ${user.email}`);
            setLoading(false);
        } else {
            router.push({
                pathname: "/login",
                query: {
                    error: "You muse be logged in to view that page",
                    redirect: encodeURIComponent(router.asPath),
                },
            });
        }
    }, [user]);

    if (loading) {
        return (
            <Content title={title} user={user}>
                <>
                    <h2>Loading...</h2>
                </>
            </Content>
        );
    }

    return (
        <Content title={title} user={user}>
            <>{children}</>
        </Content>
    );
};

export default ProtectedContent;
