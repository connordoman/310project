/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */

import { supabase, checkLoginStatus, getUser } from "/public/utils/supabase.js";

export const signUserUp = async (req, res) => {
    console.log("Signup function entered...");
    // check if logged in

    try {
        const { username, email, password, firstName, lastName, phone } = req.body;

        // let user = await getUser(req, res);
        console.log("Checking logged in...");
        let { data: user } = await supabase.from("user_staff").select("*").eq("username", username).single();

        console.log(`Found user: ${user}`);

        if (user && (user.username === username || user.email === email)) {
            console.log("User already signed up");
            res.redirect("/");
            return false;
        }

        // Sign user up if they dont exist
        if (!user) {
            const {
                data: { user: authUser },
                error,
            } = await supabase.auth.signUp({
                email,
                phone,
                password,
            });

            if (error) {
                throw new Error(error.message);
            }

            user = authUser;
            console.log(`User created: ${JSON.stringify(authUser, null, 4)}`);
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
        const { error: insertErr } = await supabase.from("staff").insert(newUserStaff, { returning: "minimal" });

        if (insertErr) {
            throw new Error(insertErr.message);
        }
        console.log("Signup function passed...");
    } catch (err) {
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
                    res.status(200);
                    res.redirect("/user");
                } else {
                    console.log("Failed to sign up");
                    res.status(401);
                    res.redirect("/signup");
                }
                // res.status(200);
                // res.end();
            })
            .catch((error) => {
                console.error(`Error signing up user: ${error}`);
                // res.status(500).write("Error signing up user");
                res.redirect(`/signup?e=${encodeURIComponent(error)}`);
            });
    }
};

export default handler;
