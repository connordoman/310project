/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase, checkLoginStatus } from "/public/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import TextBox from "/components/TextBox.jsx";
import { Button } from "/components/Button.jsx";

export const Login = ({ user }) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        if (!email) return;
        setLoading(true);

        const { error } = await supabase.auth.signInWithOtp({
            email,
        });

        if (error) {
            console.error({ error });
        } else {
            setSubmitted(true);
        }
    };

    return (
        <Content title="Login" user={user}>
            <TextColumn dir="column">
                {submitted ? (
                    <p>Check your email for the link!</p>
                ) : (
                    <>
                        <h2>Please login</h2>
                        <TextBox
                            placeholder="Email"
                            onChange={(v) => {
                                setEmail(v);
                            }}
                        />
                        <Button onClick={() => signIn()} disabled={loading}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </>
                )}
            </TextColumn>
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let loggedIn = await checkLoginStatus(req, res);

    if (loggedIn) {
        return {
            props: {},
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default Login;
