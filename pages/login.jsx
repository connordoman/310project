/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase, checkLoginStatus } from "/public/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import TextBox from "/components/TextBox.jsx";
import SignInForm, { SignInOTP } from "../components/SignInForm";
import { Button } from "/components/Button.jsx";
import { useRouter } from "next/router";
import { redirectIfLoggedIn } from "../public/utils/supabase";

export const Login = ({ user }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (s) => {
        console.log("set submitted: " + s);
        setSubmitted(s);
    };

    return (
        <Content title="Login" user={user}>
            <TextColumn dir="column">
                {submitted ? (
                    <p>Check your email for the link!</p>
                ) : (
                    <>
                        <SignInOTP onSubmit={handleSubmit} />
                        <SignInForm onSubmit={handleSubmit} />
                    </>
                )}
            </TextColumn>
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    return redirectIfLoggedIn(req, res, `/order`, "You are already logged in!");
};

export default Login;
