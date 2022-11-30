/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, cloneElement } from "react";
import { FlexCol, FlexRow } from "/components/Flex.jsx";

export const TextColumn = ({ text, children, dir = "row", tAlign = "l", ...props }) => {
    const [textAlign, setTextAlign] = useState("left");
    const [flexRow, setFlexRow] = useState(false);

    useEffect(() => {
        if (dir.toUpperCase() === "ROW") {
            setFlexRow(true);
        } else {
            setFlexRow(false);
        }
    }, [dir]);

    useEffect(() => {
        let c = tAlign[0].toUpperCase();

        if (c == "R") setTextAlign("right");
        else if (c == "C") setTextAlign("center");
        else setTextAlign("left");
    }, [tAlign]);

    const content = (
        <>
            <p>{text}</p>
            {cloneElement(children, { props })}
        </>
    );

    return (
        <div className="textColumn" style={{ textAlign }}>
            {flexRow ? <FlexRow>{content}</FlexRow> : <FlexCol>{content}</FlexCol>}
        </div>
    );
};

export default TextColumn;
