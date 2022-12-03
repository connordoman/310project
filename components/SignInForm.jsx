/*
 * Created on Tue Dec 01 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase, checkIfUserExists } from "/public/utils/supabase.js";
import styles from "/public/styles/SignUpForm.module.css";
import { Button } from "/components/Button";
import TextBox from "./TextBox";
import { useRouter } from "next/router";

export const SignInOTP = ({ redirectTo, onSubmit }) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        onSubmit(submitted);
    }, [submitted]);

    const signIn = async () => {
        if (!email) return;
        setLoading(true);

        const exists = await checkIfUserExists({ email });

        // redirect to sign up if user doesn't exist
        if (!exists) {
            router.push({
                pathname: "/signup",
                query: { error: encodeURIComponent("You need to sign up first") },
            });
            return;
        }

        const { error } = await supabase.auth.signInWithOtp({
            email,
        });

        // make content visible
        if (error) {
            console.error("Error in sign in: " + error.message);
        } else {
            console.log("Sign in successful");
            setLoading(false);
            setSubmitted(true);
        }
        // setSubmitted(true);
    };

    const validateEmail = () => {
        return !(email.length > 4 && email.includes("@") && email.includes("."));
    };

    return (
        <>
            <h2>Log In With One-Time Link</h2>
            <TextBox
                className="inputField total-radius"
                placeholder="Email"
                value={email}
                onChange={(v) => {
                    setEmail(v);
                }}
            />
            <Button onClick={() => signIn()} disabled={loading || validateEmail()}>
                {loading ? "Loading..." : "Sign In"}
            </Button>
        </>
    );
};

export const SignInForm = ({ redirectTo, onSubmit }) => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [queryRedirect, setQueryRedirect] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (router.query.redirectTo !== undefined) {
            setQueryRedirect(router.query);
        } else if (redirectTo !== undefined) {
            setQueryRedirect(redirectTo);
        }
    }, []);

    useEffect(() => {
        if (submitted && !onSubmit) {
            router.push({
                pathname: queryRedirect ? queryRedirect : "/",
                query: { success: encodeURIComponent("Signed in successfully!") },
            });
        } else if (onSubmit) {
            onSubmit(submitted);
        }
    }, [submitted]);

    const validateUsername = (username) => {
        setUsername(username.replace(/\s/g, "").slice(0, 20));
    };

    const validatePassword = (pw) => {
        setPassword(pw.slice(0, 64));
    };

    // Workflow: type username -> validateUsername -> select email from user_staff where username = $username -> set email

    const signInUsernameAndPassword = async () => {
        if (!username || !password) return;

        setLoading(true);

        let { data, error } = await supabase.from("user_staff").select("email").eq("username", username).single();
        console.log(`Found user: ${JSON.stringify(data)}`);

        if (error) {
            console.error({ error });
            return;
        }

        // check if user entered email instead of username
        if (!data) {
            ({ data, error } = await supabase.from("user_staff").select("username").eq("email", username).single());

            if (error) {
                throw new Error(error.message);
            }

            console.log(`Found user again: ${JSON.stringify(data)}`);
        }

        // sign user in with email
        if (data) {
            console.log(`User email: ${data.email}`);

            let {
                data: { user },
                error,
            } = await supabase.auth.signInWithPassword({
                email: data.email,
                password,
            });

            if (!data) {
                let message = "No user found";
                if (error) {
                    message = error.message;
                }
                console.error(message);
                router.push({
                    pathname: "/signup",
                    query: { error: encodeURIComponent("Could not find that user.") },
                });
                return;
            }

            if (error) {
                console.error("Error in sign in: " + error.message);
            } else {
                console.log("Sign in successful");
                setLoading(false);
                setSubmitted(true);
            }
        }
    };

    if (submitted) {
        return (
            <div className={styles.form}>
                <h2>Successfully signed in!</h2>
            </div>
        );
    }

    return (
        <div className={styles.form}>
            <h2>Log In With Password</h2>
            <TextBox
                className="inputField total-radius"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(v) => validateUsername(v)}
                required
            />
            <TextBox
                className="inputField total-radius"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(v) => validatePassword(v)}
                required
            />
            <Button
                form="signinform"
                name="signin"
                f="12pt"
                h="2em"
                w="auto"
                m="0.25em"
                p="0.5em"
                onClick={() => signInUsernameAndPassword()}
                disabled={password.length < 12 || username.length < 1 || loading}
            >
                Sign In
            </Button>
        </div>
    );
};

export default SignInForm;
