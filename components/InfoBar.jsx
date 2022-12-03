/*
 * Created on Wed Nov 30 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect, useState } from "react";
import { FlexRow } from "./Flex";

const style = {
    width: "100%",
    height: "1em",
    justifyContent: "flex-end",
    marginRight: "0.5em",
    width: "100%",
    borderTop: "0.01em solid #000",
    borderBottom: "0.01em solid #000",
    padding: "1em",
};

export const InfoBar = ({ user }) => {
    return <FlexRow style={{ ...style }}>{user ? `Logged in as ${user.username}` : "Not logged in"}</FlexRow>;
};

export default InfoBar;
