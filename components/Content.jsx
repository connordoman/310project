/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect, cloneElement } from "react";
import { APP_NAME, APP_PREFIX } from "/public/utils/app_data.js";
import { isMobile } from "react-device-detect";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export const Content = ({ user, title, pageTitle, children, ...props }) => {
    useEffect(() => {
        document.title = `${title} | ${APP_NAME}`;
    });
    return (
        <div className="content">
            <Header user={user} title={pageTitle ? pageTitle : " " + title} />
            {cloneElement(children, { ...props })}
            <Footer />
        </div>
    );
};

export default Content;
