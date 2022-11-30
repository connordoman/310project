/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */

export const FlexRow = ({ children, style }) => {
    return (
        <div
            class="flex-row"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const FlexCol = ({ children, style }) => {
    return (
        <div
            class="flex-col"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
