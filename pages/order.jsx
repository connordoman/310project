/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Content from "/components/Content.jsx";
import OrderPanel from "/components/OrderPanel.jsx";
import { getUser } from "../public/utils/supabase";
import { TEST_ITEMS } from "/public/utils/test_order_items.js";

const Order = ({ user }) => {
    return (
        <Content title="Order" user={user}>
            <OrderPanel testOrderItems={TEST_ITEMS} />
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let foundUser = await getUser(req, res);
    return { props: { user: foundUser } };
};

export default Order;
