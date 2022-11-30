/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */

import { supabase, checkLoginStatus } from "/public/utils/supabase.js";

export const signUserUp = async (req, res) => {
    console.log("Signup function entered...");
    // check if logged in
    const loggedIn = await checkLoginStatus(req, res);
    console.log("Checking logged in...");

    if (loggedIn) {
        console.log("User already logged in");
        return false;
    }

    try {
        const { username, email, password, firstName, lastName, phone } = req.body;

        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return false;
        }

        await supabase.from("staff").insert([{ id: user.id, username, email, firstName, lastName, phone }]);
        console.log("Signup function passed...");
    } catch (err) {
        console.log(`Error signing up user: ${err}`);
        throw err;
    }
    return true;
};

export const handler = async (req, res) => {
    if (req.method === "POST") {
        console.log(`Request method: ${req.method}`);
        // perhaps a user signed up
        return await signUserUp(req, res)
            .then((signedUp) => {
                console.log("Signup function returned...");
                if (signedUp) {
                    console.log("Signed up");
                    res.status(200).json({ message: "Signed up successfully" });
                    res.redirect("/user");
                } else {
                    console.log("Failed to sign up");
                    res.status(401).json({ message: "Error signing up" });
                }
                res.status(200).send();
            })
            .catch(() => {
                res.status(500).send();
            });
    }
};

export default handler;
