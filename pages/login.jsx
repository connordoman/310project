/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import TextBox from "/components/TextBox.jsx";
import { Button } from "/components/Button.jsx";

export const Login = () => {
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
        <Content title="Login">
            <TextColumn>
                {submitted ? (
                    <p>Check your email for the link!</p>
                ) : (
                    <div>
                        <TextBox
                            placeholder="Email"
                            onChange={(v) => {
                                setEmail(v);
                            }}
                        />
                        <Button onClick={() => signIn()} disabled={loading}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </div>
                )}
            </TextColumn>
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {};

export default Login;
