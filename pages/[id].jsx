/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { supabase } from "/public/utils/supabase.js";
import Content from "/components/Content";
import TextColumn from "/components/TextColumn";
import UserTable from "../components/UserTable";
import { getUser } from "../public/utils/supabase";

export const UserDetails = ({ user, profile }) => {
    const columns = ["id", "username", "email", "permission", "created_at", "updated_at"];

    console.log({ profile });
    return (
        <Content title="User Details" user={user}>
            <TextColumn>
                <>
                    <h2>
                        User details for <em>{profile.username}</em>
                    </h2>
                    <UserTable user={profile} columns={columns} />
                </>
            </TextColumn>
        </Content>
    );
};

export const getStaticPaths = async () => {
    const { data: prof } = await supabase.from("user_staff").select("id");

    const paths = prof.map(({ id }) => ({
        params: {
            id: id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ req, res, params: { id } }) => {
    const user = await getUser(req, res);

    console.error("USER IN [ID] PAGE: ", user);

    const { data: prof } = await supabase
        .from("user_staff")
        .select("*")
        .eq("id", id)
        // .gte("permission", user.permission)
        .single();

    if (!prof) {
        return {
            props: {},
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user,
            profile: prof,
        },
    };
};

export default UserDetails;
