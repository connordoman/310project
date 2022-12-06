/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { useState, useEffect, useRef } from "react";
import MarkdownRenderer from "/components/MarkdownRenderer.jsx";
import { getUser } from "../public/utils/supabase";

/**
 * Page content and app entry point
 */

export const App = ({ user }) => {
    return (
        <Content title="Home" user={user}>
            <MarkdownRenderer file="/content/homepage.md" />
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let foundUser = await getUser(req, res);
    return { props: { user: foundUser } };
};

export default App;
