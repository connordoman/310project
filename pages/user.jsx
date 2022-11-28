/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase } from "/utils/supabase.js";
import { useRouter } from "next/router";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Button from "/components/Button.jsx";
import { getCookie } from "cookies-next";

export const UserPage = ({ user }) => {
    return (
        <Content title="User">
            <TextColumn>
                <p>This an example of a protected page.</p>
                <p>{user.id}</p>
            </TextColumn>
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    const refreshToken = getCookie("my-refresh-token", { req, res });
    const accessToken = getCookie("my-access-token", { req, res });

    if (refreshToken && accessToken) {
        await supabase.auth.setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
        });
    }

    // returns user information
    const {
        data: { user },
    } = await supabase.auth.getUser();

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
        props: { user },
    };
};

export default UserPage;
