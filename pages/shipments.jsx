/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Content from "/components/Content.jsx";
import ShipmentPanel from "/components/ShipmentPanel.jsx";
import { TEST_ITEMS } from "/public/utils/test_shipments.js";

export const Shipments = ({ user }) => {
    return (
        <Content title="Shipments" user={user}>
            <ShipmentPanel testShipments={TEST_ITEMS} />
        </Content>
    );
};

export default Shipments;
