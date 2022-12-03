/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect, useState, cloneElement } from "react";
import { APP_NAME, APP_PREFIX } from "/public/utils/app_data.js";
import { isMobile } from "react-device-detect";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import TextColumn from "./TextColumn";
import { useRouter } from "next/router";
import { FlexRow } from "./Flex";

export const Content = ({ user, title, pageTitle, children, ...props }) => {
    const router = useRouter();
    const [error, setError] = useState(router.query.error);
    const [success, setSuccess] = useState(router.query.success);

    const [setQueries, setSetQueries] = useState(false);

    useEffect(() => {
        document.title = `${title} | ${APP_NAME}`;
    }, []);

    useEffect(() => {
        if (router.query.error) setError(decodeURIComponent(router.query.error));
        if (router.query.success) setSuccess(decodeURIComponent(router.query.success));
    }, [router.query]);

    useEffect(() => {
        if (error || success) {
            setSetQueries(true);
        }
    }, [error, success]);

    useEffect(() => {
        if (setQueries) {
            router.replace(router.pathname, undefined, { shallow: true });
            setSetQueries(false);
        }
    }, [setQueries]);

    const multipleMessages = Array.isArray(error) || Array.isArray(success) || (error && success);

    return (
        <div className="content">
            <Header user={user} title={pageTitle ? pageTitle : " " + title} />
            <TextColumn dir="col">
                <>
                    {error || success ? (
                        <FlexRow style={{ width: "100%", justifyContent: "flex-start" }}>
                            <>
                                <p>
                                    {`Message${multipleMessages ? "s" : ""} from the server: `}
                                    {error ? <span className="error">{error}</span> : null}
                                    {multipleMessages ? ", " : null}
                                    {success ? <span className="success">{success}</span> : null}
                                </p>
                            </>
                        </FlexRow>
                    ) : null}
                    {cloneElement(children, { ...props })}
                </>
            </TextColumn>
            <Footer />
        </div>
    );
};

export default Content;
