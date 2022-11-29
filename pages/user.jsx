/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase, setSessionTokens } from "/utils/supabase.js";
import { useRouter } from "next/router";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Button from "/components/Button.jsx";
import { getCookie } from "cookies-next";

export const UserPage = ({ profile }) => {
    return (
        <Content title={`${profile.firstName} ${profile.lastName}'s Profile`}>
            <TextColumn>
                <p>This an example of a protected page.</p>
                <p>{profile.id}</p>
            </TextColumn>
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let loggedIn = await setSessionTokens(req, res);

    if (!loggedIn) {
        return {
            props: {},
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    // returns user information
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { error, data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    console.log(`Profile: ${JSON.stringify(profile)}`);

    return {
        props: { profile },
    };
};

export default UserPage;
