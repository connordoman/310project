/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import { supabase, getUser } from "/public/utils/supabase.js";
import Content from "/components/Content";
import TextColumn from "/components/TextColumn";
import ProfilesPanel from "/components/ProfilesPanel";

export const Profiles = ({ user, profiles }) => {
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
        <Content title="Profiles" user={user}>
            {loading ? <h2>Loading...</h2> : <ProfilesPanel user={user} profiles={profiles} />}
        </Content>
    );
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

    const { data: authPermission } = await supabase.from("user_staff").select("permission").eq("id", user.id).single();

    const { error, data: profiles } = await supabase
        .from("user_staff")
        .select("*")
        .gte("permission", authPermission.permission);

    console.log(`Profiles: ${JSON.stringify(profiles)}`);
    console.log("error", error);

    return {
        props: {
            user,
            profiles,
        },
    };
};

export default Profiles;
