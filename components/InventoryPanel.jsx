// inventory panel lists all the items in the inventory

import React from "react";
import styles from "/public/styles/InventoryPanel.module.css";
import { useState, useEffect, useRef } from "react";
import TextBox from "./TextBox";
import { Button } from "./Button";

export class Warehouse {
    constructor(warehouse_id, total_space, remaining_space, inventory = [], changes = []) {
        this.warehouse_id = warehouse_id;
        this.total_space = total_space;
        this.remaining_space = remaining_space;
        this.inventory = inventory;
        this.changes = changes;
    }

    get spaceString() {
        return `${this.remaining_space}/${this.total_space}`;
    }

    toString() {
        return `${this.warehouse_id}. ${this.remaining_space}`;
    }

    // add an item to the inventory
    addItem(item_id, item_name, item_quantity) {
        this.inventory.push({ item_id, item_name, item_quantity });
        let status = "+" + item_quantity;
        this.changes.push({ status, item_id, item_name, item_quantity });
    }

    // remove an item from the inventory
    removeItem(item_id, item_name, item_quantity) {
        this.inventory = this.inventory.filter((item) => item.item_id !== item_id);
        let status = "-" + item_quantity;
        this.changes.push({ status, item_id, item_name, item_quantity });
    }

    // update the quantity of an item in the inventory
    updateItem(item_id, item_name, item_quantity) {
        this.inventory.forEach((item) => {
            if (item.item_id === item_id) {
                item.item_quantity = item_quantity;
            }
        });
        if (item.item_quantity < item_quantity) {
            let status = "+" + item_quantity;
        } else {
            let status = "-" + item_quantity;
        }
        this.changes.push({ status, item_id, item_name, item_quantity });
    }

    // get the quantity of an item in the inventory
    getItemQuantity(item_id) {
        let item = this.inventory.find((item) => item.item_id === item_id);
        return item.item_quantity;
    }

    // get the name of an item in the inventory
    getItemName(item_id) {
        let item = this.inventory.find((item) => item.item_id === item_id);
        return item.item_name;
    }

    // get the item object of an item in the inventory
    getItem(item_id) {
        return this.inventory.find((item) => item.item_id === item_id);
    }

    // get the changes made to the inventory
    getChanges() {
        return this.changes;
    }

    getAllItems() {
        return this.inventory;
    }
}

export function InventoryPanel({ warehouse, inventoryItems }) {
    const [warehouseObject, setWarehouseObject] = useState({});
    const [selectedWarehouse, setSelectedWarehouse] = useState(warehouse);
    const [warehouseList, setWarehouseList] = useState(inventoryItems);
    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    // const [warehouse, setWarehouse] = useState(0);
    // const [warehouseSpace, setWarehouseSpace] = useState(0);
    // const [warehouseSpaceRemaining, setWarehouseSpaceRemaining] = useState(0);
    // const [warehouseInventory, setWarehouseInventory] = useState([]);
    const warehouseRef = useRef(warehouse);
    const warehouseSpaceRef = useRef(warehouseSpace);
    const warehouseSpaceRemainingRef = useRef(warehouseSpaceRemaining);
    const warehouseInventoryRef = useRef(warehouseInventory);

    // update warehouse list
    useEffect(() => {
        setWarehouseList(inventoryItems);
    }, [inventoryItems]);

    const addItem = (e) => {
        // check if the warehouse is full
        if (warehouse_space_remaining < item_quantity) {
            alert("Warehouse is full");
            return;
        }

        // check if the quantity is valid
        if (item_quantity <= 0) {
            alert("Invalid quantity");
            return;
        }

        // check if the warehouse is valid
        if (warehouse_id < 0 || warehouse_id >= warehouse_list.length) {
            alert("Invalid warehouse");
            return;
        }
        // check if the item already exists in the warehouse

        // add the item to the warehouse
    };

    // remove item from warehouse
    const removeItem = (e) => {
        // check if the warehouse is valid
        if (warehouse_id < 0 || warehouse_id >= warehouse_list.length) {
            alert("Invalid warehouse");
            return;
        }

        // check if the item exists in the warehouse
        let item_exists = warehouse_inventory_object.find((item) => item.item_id === item_id);
        if (!item_exists) {
            alert("Item does not exist in warehouse");
            return;
        }

        // check if the quantity is valid
        if (item_quantity <= 0) {
            alert("Invalid quantity");
            return;
        }

        // remove the item from the warehouse
    };

    // change active warehouse using warehouse_Id with dropdown menu
    const changeWarehouse = (e) => {};

    const warehouseMenu = (
        <select
            className={styles.warehouseDropdown}
            onChange={(e) => {
                warehouseRef.current = e.target.value;
                setWarehouse(warehouseRef.current);
                changeWarehouse(e);
            }}
        >
            {warehouseList.map((warehouse, index) => (
                <option key={index} value={index}>
                    {warehouse.warehouse_id}
                </option>
            ))}
        </select>
    );

    return (
        <div className={styles.inventory_panel}>
            <div className={styles.inventory_panel__warehouse}>
                <h1>Warehouse: {warehouseMenu}</h1>
                <p>Total Space: {warehouseSpace}</p>
                <p>Remaining Space: {warehouseSpaceRemaining}</p>
            </div>
            <div className={styles.inventory_panel__inventory}>
                <h1>Inventory</h1>
                <ul>
                    {itemList.map((item, index) => (
                        <li key={index}>
                            <p>
                                Item ID: {item.item_id} Quantity: {item.item_quantity}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* add/remove */}
            <div className={styles.inventory_panel__add_remove}>
                <h1>Add/Remove Item</h1>
                <form>
                    <label>
                        Item ID:
                        <TextBox
                            value={item}
                            onChange={(v) => {
                                setItem(v);
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        Quantity:
                        <TextBox
                            type="text"
                            value={quantity}
                            onChange={(v) => {
                                setQuantity(v);
                            }}
                        />
                    </label>
                    <br />
                    <Button onClick={addItem}>Add</Button>
                    <Button onClick={removeItem}>Remove</Button>
                </form>
            </div>
            <div className={styles.inventory_panel__history}>
                <h1>History</h1>
                <ul>
                    {warehouseList[warehouse].changes.reverse().map((change, index) => (
                        <li key={index}>
                            <p>
                                {change.status} Item ID: {change.item_id} Quantity: {change.total_quantity}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default InventoryPanel;
