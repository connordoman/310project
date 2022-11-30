/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import Content from "../components/Content";
import TextColumn from "../components/TextColumn";
import { useRouter } from "next/router";

export const SignUp = ({ user }) => {
    const router = useRouter();
    console.log(JSON.stringify(router.asPath, null, 4));
    return (
        <Content title="Sign Up" user={user}>
            <TextColumn dir="col">
                <SignUpForm />
            </TextColumn>
        </Content>
    );
};

export default SignUp;
