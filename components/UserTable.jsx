/*
 * Created on Tue Nov 29 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState } from "react";
import Link from "next/link";

export const UserTable = ({ user }) => {
    const tableRows = Object.keys(user).map((key) => {
        let value = user[key];
        if (key.toUpperCase().indexOf("ID") > -1) {
            value = (
                <Link href={{ pathname: `/${value}` }}>
                    <a>{value}</a>
                </Link>
            );
        }
        return (
            <tr key={key}>
                <th className="r-align">{key}</th>
                <td>{value}</td>
            </tr>
        );
    });

    const customRows = (
        <>
            <tr>
                <th className="r-align">ID</th>
                <td>
                    <Link href={{ pathname: `/${user.id}` }}>
                        <a>{user.id}</a>
                    </Link>
                </td>
            </tr>
            <tr>
                <th className="r-align">Name</th>
                <td>
                    {user.firstName} {user.lastName}
                </td>
            </tr>
            <tr>
                <th className="r-align">Email</th>
                <td>{user.email || "---"}</td>
            </tr>
            <tr>
                <th className="r-align">Phone</th>
                <td>{user.phone || "---"}</td>
            </tr>
            <tr>
                <th className="r-align">Username</th>
                <td>{user.username || "---"}</td>
            </tr>
        </>
    );

    return (
        <table className="table" style={{ width: "100%", margin: "0" }}>
            <tbody>{customRows}</tbody>
        </table>
    );
};

export default UserTable;
