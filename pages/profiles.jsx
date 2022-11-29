/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import { supabase, setSessionTokens } from "/utils/supabase.js";
import Content from "/components/Content";
import TextColumn from "/components/TextColumn";
import ProfilesPanel from "/components/ProfilesPanel";

export const Profiles = ({ profiles }) => {
    const [mounted, setMounted] = useState(false);
    const [permission, setPermission] = useState(0);
    // const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading && profiles) {
            setLoading(false);
            console.log(profiles);
        }
    }, [profiles]);

    return (
        <Content title="Profiles">
            <TextColumn>{loading ? <h2>Loading...</h2> : <ProfilesPanel profiles={profiles} />}</TextColumn>
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

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: authPermission } = await supabase.from("profiles").select("permission").eq("id", user.id).single();

    const { error, data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .lte("permission", authPermission.permission);

    console.log(`Profiles: ${JSON.stringify(profiles)}`);
    console.log("error", error);

    return {
        props: {
            profiles,
        },
    };
};

export default Profiles;
