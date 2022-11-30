/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, cloneElement } from "react";
import { FlexCol, FlexRow } from "/components/Flex.jsx";

export const TextColumn = ({ text, children, tAlign = "l", ...props }) => {
    const [textAlign, setTextAlign] = useState("left");
    const [flexRow, setFlexRow] = useState(false);
    const [style, setStyle] = useState(props.style);

    useEffect(() => {
        let c = tAlign[0].toUpperCase();

        if (c == "R") setTextAlign("right");
        else if (c == "C") setTextAlign("center");
        else setTextAlign("left");
    }, [tAlign]);

    useEffect(() => {
        setStyle({
            textAlign: textAlign,
            minWidth: "50%",
            maxWidth: "95%",
            margin: "0 auto",
            ...props.style,
        });
    }, [textAlign, props.style]);

    const content = (
        <>
            {text ? <p>{text}</p> : <></>}
            {cloneElement(children, { props })}
        </>
    );

    const flex = <FlexCol style={{ textAlign, ...style }}>{content}</FlexCol>;

    return flex;
};

export default TextColumn;
