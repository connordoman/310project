/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { useState, useEffect, useRef } from "react";
import MarkdownRenderer from "/components/MarkdownRenderer.jsx";

/**
 * Page content and app entry point
 */

export const App = ({ user }) => {
    return (
        <Content title="Home" user={user}>
            <MarkdownRenderer file="/content/individualproject.md" />
        </Content>
    );
};

export default App;
