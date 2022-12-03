/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import ProtectedContent from "/components/ProtectedContent.jsx";
import OrderPanel from "/components/OrderPanel.jsx";
import { getUser, supabase } from "../public/utils/supabase";
import { TEST_ITEMS } from "/public/utils/test_order_items.js";

const OrderPage = ({ user, products }) => {
    const items = products ? products : TEST_ITEMS;

    return (
        <ProtectedContent title="Order" user={user}>
            <OrderPanel testOrderItems={items} />
        </ProtectedContent>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let foundUser = await getUser(req, res);

    if (foundUser) {
        let { data: products, error } = await supabase
            .from("product_category")
            .select("*")
            .gte("pid", foundUser.permission);

        if (error) {
            console.log(error);
        } else {
            console.log(products);

            return {
                props: {
                    user: foundUser,
                    products,
                },
            };
        }
    }

    return { props: { user: foundUser } };
};

export default OrderPage;
