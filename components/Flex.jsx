/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */

export const FlexRow = ({ children, style, justifyContent }) => {
    return (
        <div
            className="flex-row"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: justifyContent ? justifyContent : "flex-start",
                alignItems: "center",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const FlexCol = ({ children, style, justifyContent }) => {
    return (
        <div
            className="flex-col"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: justifyContent ? justifyContent : "center",
                alignItems: "center",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
