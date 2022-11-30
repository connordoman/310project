import { Html, Head, Main, NextScript } from "next/document";
import { useState, useEffect } from "react";
import { getUser } from "/public/utils/supabase.js";
import Content from "/components/Content.jsx";

export default function Document({ user }) {
    return (
        <Html lang="en">
            <Head>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏥</text></svg>"
                />
            </Head>
            <body>
                <Main />
                <NextScript user={user} />
            </body>
        </Html>
    );
}

export const getServerSideProps = async (context) => {
    const user = await getUser(context.req, context.res);

    if (user) {
        return {
            props: { user },
        };
    } else {
        return {
            props: {},
        };
    }
};
