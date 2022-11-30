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

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else if (!user) {
            router.push("/login");
        }
    }, [user]);

    if (loading) {
        return (
            <Content title="Loading...">
                <>
                    <InfoBar user={user} />
                    <h1>Loading...</h1>
                </>
            </Content>
        );
    }

    return <Content title={title}>{children}</Content>;
};

export const getServerSideProps = async ({ req, res }) => {
    let user = await getUser(req, res);
    if (!user) {
        return {
            props: {},
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user,
        },
    };
};

export default ProtectedContent;
