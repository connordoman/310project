/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import ProtectedContent from "../components/ProtectedContent";
import TextColumn from "/components/TextColumn.jsx";
import UserTable from "/components/UserTable.jsx";
import { getUser, getUserProfileOrRedirect } from "../public/utils/supabase";

export const UserPage = ({ user }) => {
    return (
        <ProtectedContent title={`Staff Profile`} user={user}>
            <TextColumn>
                <>
                    <h2>User Information</h2>
                    <UserTable user={user} />
                </>
            </TextColumn>
        </ProtectedContent>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    return { props: { user: await getUser(req, res) } };
};

export default UserPage;
