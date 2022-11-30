/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import styles from "/public/styles/SignUpForm.module.css";
import { Button } from "/components/Button";

export const SignUpForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const [pwMatch, setPwMatch] = useState(true);

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

    return (
        <div className={styles.form}>
            <h2>Sign Up New User</h2>
            <form action="/api/signup" method="post" id="signupform">
                <input
                    className="inputField total-radius"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => validateUsername(e.target.value)}
                    required
                />
                <input
                    className="inputField total-radius"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    required
                />
                <input
                    className="inputField total-radius"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    required
                />
                <input
                    className="inputField total-radius"
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => validatePassword2(e.target.value)}
                    required
                />
                <input
                    className="inputField total-radius"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => validateFirstName(e.target.value)}
                    required
                />
                <input
                    className="inputField total-radius"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => validateLastName(e.target.value)}
                    required
                />
                <input
                    className="inputField total-radius"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => validatePhone(e.target.value)}
                />
                <Button
                    type="submit"
                    form="signupform"
                    name="signup"
                    f="12pt"
                    h="2em"
                    w="auto"
                    m="0.25em"
                    p="0.5em"
                    disabled={!pwMatch}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;
