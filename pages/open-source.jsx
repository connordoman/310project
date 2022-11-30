/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import MarkdownRenderer from "/components/MarkdownRenderer.jsx";
import Content from "/components/Content.jsx";

export const OpenSourceInfo = ({ user }) => {
    return (
        <Content title="Open Source Information" user={user}>
            <MarkdownRenderer file="/content/open-source.md" />
        </Content>
    );
};

export default OpenSourceInfo;
