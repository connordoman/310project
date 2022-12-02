/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import styles from "/public/styles/SignUpForm.module.css";
import { Button } from "/components/Button";
import TextBox from "./TextBox";
import { getUser, supabase } from "../public/utils/supabase";
import { useRouter } from "next/router";

export const SignUpForm = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const [pwMatch, setPwMatch] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        comparePasswords();
    }, [password]);

    useEffect(() => {
        comparePasswords();
    }, [password2]);

    const comparePasswords = () => {
        if (password === password2) {
            setPwMatch(true);
        } else {
            setPwMatch(false);
        }

        if (password === "" || password2 === "") {
            setPwMatch(false);
        }

        if (password.length < 12 || password2.length < 12) {
            setPwMatch(false);
        }
    };

    const validateUsername = (username) => {
        setUsername(username.replace(/\s/g, "").slice(0, 20));
    };

    const validatePassword = (pw) => {
        setPassword(pw.slice(0, 64));
    };

    const validatePassword2 = (pw) => {
        setPassword2(pw.slice(0, 64));
    };

    const validateEmail = (email) => {
        setEmail(email.replace(/\s/g, "").slice(0, 64));
    };

    const validateFirstName = (name) => {
        setFirstName(name.slice(0, 32));
    };
    const validateLastName = (name) => {
        setLastName(name.slice(0, 32));
    };

    const validatePhone = (phone) => {
        setPhone(phone.replace(/[^0-9\-]/g, "").slice(0, 32));
    };

    const signUp = async () => {
        if (!username || !email || !password || !password2 || !firstName || !lastName || !phone) return;
        setLoading(true);
        // check if user already exists

        try {
            let {
                data: { user },
                error,
            } = await supabase.from("user_staff").select("*").eq("username", username);

            if (error) {
                throw new Error(error.message);
            }

            if (user && (user.username === username || user.email === email)) {
                console.log("User already signed up");
                router.push("/");
            }

            // Sign user up if they dont exist
            if (!user) {
                ({
                    data: { user },
                    error,
                } = await supabase.auth.signUp({
                    email,
                    password,
                }));

                if (error) {
                    throw new Error(error.message);
                }

                console.log(`User created: ${JSON.stringify(user, null, 4)}`);
            }

            // user = await getUser(req, res);

            // Create user to insert in staff
            const newUserStaff = {
                id: user.id,
                created_at: user.created_at,
                username,
                firstName,
                lastName,
                permission: 5,
            };

            console.log(`New user: ${JSON.stringify(newUserStaff, null, 4)}`);

            // Insert into staff database
            ({ error } = await supabase.from("staff").insert(newUserStaff, { returning: "minimal" }));

            if (error) {
                throw new Error(error.message);
            } else {
                console.log("User inserted into staff");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setSubmitted(true);
            console.log("Signup function passed...");
        }
    };

    if (submitted) {
        return (
            <div className={styles.form}>
                <h2>Please check your email to verify!</h2>
            </div>
        );
    }

    return (
        <div className={styles.form}>
            <h2>Sign Up New User</h2>
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
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(v) => validateEmail(v)}
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
            <TextBox
                className="inputField total-radius"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={(v) => validatePassword2(v)}
                required
            />
            <TextBox
                className="inputField total-radius"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(v) => validateFirstName(v)}
                required
            />
            <TextBox
                className="inputField total-radius"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(v) => validateLastName(v)}
                required
            />
            <TextBox
                className="inputField total-radius"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(v) => validatePhone(v)}
            />
            <Button
                name="signup"
                f="12pt"
                h="2em"
                w="auto"
                m="0.25em"
                p="0.5em"
                disabled={!pwMatch || loading}
                onClick={() => signUp()}
            >
                Sign Up
            </Button>
        </div>
    );
};

export default SignUpForm;
