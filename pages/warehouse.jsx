import Content from "/components/Content.jsx";
import InventoryPanel from "/components/InventoryPanel.jsx";
import { TEST_ITEMS } from "/public/utils/test_warehouse.js";

export const Warehouse = ({ user }) => {
    return (
        <Content title="Warehouse" user={user}>
            <InventoryPanel inventoryItems={TEST_ITEMS} />
        </Content>
    );
};

export default Warehouse;
