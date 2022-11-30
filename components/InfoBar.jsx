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
};

export const InfoBar = ({ user }) => {
    return <FlexRow style={style}>{user ? `Logged in as ${user.username}` : "Not logged in"}</FlexRow>;
};

export default InfoBar;
