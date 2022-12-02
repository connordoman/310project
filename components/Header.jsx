/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Link from "next/link";
import NavLinks from "./NavLinks";
import { FaRegHospital } from "react-icons/fa";
import { supabase } from "/public/utils/supabase.js";
import { useEffect, useState } from "react";
import { FlexRow } from "./Flex";

export const LINK_LIST = ["Order", "Shipments", "Warehouse", "Profiles", "User"];

export const Header = ({ user, title }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(Boolean(user));
    }, [user]);

    return (
        <header className="header">
            <FlexRow>
                <Link href="/">
                    <a
                        className="link-unstyled"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FaRegHospital style={{ fontSize: "36pt", margin: "0 0.5em 0 0" }} />
                        <h1>{title}</h1>
                    </a>
                </Link>
                {loggedIn ? <span className="desc">Logged in as {user.username}</span> : <></>}
            </FlexRow>
            <FlexRow>
                <NavLinks links={LINK_LIST} />
                {" || "}
                {loggedIn ? (
                    <>
                        <Link href="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link href="/signup">Sign Up</Link>
                        <Link href="/login">Login</Link>
                    </>
                )}
            </FlexRow>
        </header>
    );
};

export default Header;
