/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase, getUser } from "/public/utils/supabase.js";
import { useRouter } from "next/router";
import Content from "/components/Content.jsx";
import ProtectedContent from "../components/ProtectedContent";
import TextColumn from "/components/TextColumn.jsx";
import UserTable from "/components/UserTable.jsx";
import { Button } from "/components/Button.jsx";
import { getCookie } from "cookies-next";

export const UserPage = ({ user, profile }) => {
    return (
        <ProtectedContent title={`Staff Profile`} user={user}>
            <>
                <h2>User Information</h2>
                <UserTable user={profile} />
            </>
        </ProtectedContent>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    // returns user information
    let user = await getUser(req, res);

    const { error, data: profile } = await supabase.from("user_staff").select("*").eq("id", user.id).single();

    if (!user || error) {
        if (error) console.error(JSON.stringify(error, null, 4));
        return {
            props: {},
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    // advance to protected page
    return {
        props: { profile },
    };
};

export default UserPage;
