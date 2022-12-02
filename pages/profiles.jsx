/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import ProfilesPanel from "/components/ProfilesPanel";
import { getUser, getUserProfileOrRedirect, supabase } from "../public/utils/supabase";
import ProtectedContent from "../components/ProtectedContent";

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
        <ProtectedContent title="Profiles" user={user}>
            {loading ? <h2>Loading...</h2> : <ProfilesPanel user={user} profiles={profiles} />}
        </ProtectedContent>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let loggedIn = await getUser(req, res);

    console.log(`Found user ${loggedIn.email}`);

    if (loggedIn) {
        // get permission of current user
        let { data: profiles, error } = await supabase
            .from("user_staff")
            .select("*")
            .gte("permission", loggedIn.permission);

        if (error) {
            console.error(error);
        }

        if (profiles) {
            console.log("Found user and profiles.");
            return { props: { user: loggedIn, profiles: profiles } };
        }

        console.log("Found user.");
        return { props: { user: loggedIn } };
    }
    console.log("Found nothing.");
    return { props: {} };
};

export default Profiles;
