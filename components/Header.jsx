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
            <FlexRow style={{ flexWrap: "nowrap", width: "100%" }} justifyContent="space-between">
                <FlexRow style={{ flexWrap: "nowrap" }}>
                    <Link href="/">
                        <a
                            style={{
                                color: "white",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <FaRegHospital style={{ fontSize: "36pt", margin: "0 0.5em 0 0" }} />
                        </a>
                    </Link>
                    <FlexRow style={{ flexWrap: "wrap" }}>
                        <h1>{title}</h1>
                        {loggedIn ? <span className="desc">Logged in as {user.username}</span> : <></>}
                    </FlexRow>
                </FlexRow>
                <FlexRow>
                    <NavLinks links={LINK_LIST} />
                    <FlexRow
                        style={{
                            flexBasis: "fit-content",
                            flexWrap: "wrap",
                            marginLeft: "0.5em",
                        }}
                    >
                        {loggedIn ? (
                            <>
                                <Link href="/logout">
                                    <a className="link">Logout</a>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/signup">
                                    <a className="link" style={{ marginRight: "0.5em" }}>
                                        Sign Up
                                    </a>
                                </Link>
                                <Link href="/login">
                                    <a className="link">Login</a>
                                </Link>
                            </>
                        )}
                    </FlexRow>
                </FlexRow>
            </FlexRow>
        </header>
    );
};

export default Header;
