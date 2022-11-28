/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect } from "react";
import { supabase } from "/utils/supabase.js";
import { useRouter } from "next/router";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";

const Logout = () => {
    useEffect(() => {
        supabase.auth.signOut();
    }, []);

    return (
        <Content>
            <TextColumn>
                <h1>Logging out...</h1>
            </TextColumn>
        </Content>
    );
};

export default Logout;
