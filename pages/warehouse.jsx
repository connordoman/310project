import Content from "/components/Content.jsx";
import InventoryPanel from "/components/InventoryPanel.jsx";
import { TEST_ITEMS } from "/public/utils/test_warehouse.js";
import { getUser } from "../public/utils/supabase";

export const Warehouse = ({ user }) => {
    return (
        <Content title="Warehouse" user={user}>
            <InventoryPanel inventoryItems={TEST_ITEMS} />
        </Content>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    let foundUser = await getUser(req, res);
    return { props: { user: foundUser } };
};

export default Warehouse;
