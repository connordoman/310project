/*
 * Created on Fri Dec 02 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect } from "react";
import { FlexCol } from "./Flex";
import TextBox from "./TextBox";

export const AddItem = () => {
    const [item, setItem] = useState({});
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

    return (
        <FlexCol>
            <TextBox type="text" placeholder="Item Name" val={itemName} onChange={(v) => setItemName(v)} />
            <TextBox type="text" placeholder="Item Name" val={itemPrice} onChange={(v) => setItemPrice(v)} />
        </FlexCol>
    );
};
