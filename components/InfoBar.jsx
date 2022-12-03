/*
 * Created on Wed Nov 30 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect, useState } from "react";
import { FlexRow } from "./Flex";

const style = {
    width: "100%",
    height: "1em",
    justifyContent: "flex-start",
    width: "100%",
    borderBottom: "0.01em solid #ccc",
    padding: "1em 0",
    flexWrap: "nowrap",
};

export const InfoBar = ({ message }) => {
    return (
        <FlexRow style={style}>
            <p style={{ margin: "0 0.5em" }}>{message || null}</p>
        </FlexRow>
    );
};

export default InfoBar;
