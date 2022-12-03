/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import User from "/public/libs/user.js";
import TextColumn from "/components/TextColumn";
import styles from "/public/styles/ProfilesPanel.module.css";
import TextBox from "/components/TextBox";

import Incrementor from "/components/Incrementor.jsx";

export const ProfileCellIncrementor = ({ val, onChange, disabled }) => {
    const [value, setValue] = useState(val);

    useEffect(() => {
        onChange(value);
    }, [value]);

    const handleChange = (value) => {
        setValue(value);
        onChange(value);
    };

    return (
        <td className={styles.incrCell}>
            <Incrementor initialValue={val} onChange={handleChange} max={5} min={1} style={{ margin: 0 }} />
        </td>
    );
};

export const ProfileInputCell = ({ val, onChange, disabled }) => {
    const [currentValue, setCurrentValue] = useState(val);

    useEffect(() => {
        onChange(currentValue);
    }, [currentValue]);

    return (
        <td>
            <TextBox
                type="text"
                value={currentValue}
                onChange={(v) => {
                    setCurrentValue(v);
                }}
                disabled={disabled}
            />
        </td>
    );
};

export const ProfileLabelCell = ({ val }) => {
    return (
        <td>
            <p style={{ margin: "0.2em 0.25em", textAlign: "center" }}>{val}</p>
        </td>
    );
};

export const ProfileTableRow = ({ profile }) => {
    const [uid, setUid] = useState(profile.id);
    const [fname, setFirstName] = useState(profile.firstName);
    const [lname, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [username, setUsername] = useState(profile.username);
    const [permission, setPermission] = useState(profile.permission);
    const [userPermission, setUserPermission] = useState(profile.permission);

    return (
        <tr className={styles.profileRow}>
            <td className={styles.idCell} title={uid}>
                <Link href={"/" + uid}>{uid.slice(0, 5)}</Link>
            </td>
            <ProfileLabelCell val={fname} />
            <ProfileLabelCell val={lname} />
            <ProfileLabelCell val={email} />
            <ProfileLabelCell val={username} />
            <ProfileLabelCell val={permission} />
            {/* {/* <ProfileInputCell val={fname} onChange={(v) => setFirstName(v)} disabled={userPermission < permission} />
            <ProfileInputCell val={lname} onChange={(v) => setLastName(v)} disabled={userPermission < permission} />
            <ProfileInputCell val={email} onChange={(v) => setEmail(v)} disabled={userPermission < permission} />
            <ProfileInputCell val={username} onChange={(v) => setUsername(v)} disabled={userPermission < permission} />
            <ProfileCellIncrementor
                val={permission}
                onChange={(v) => setPermission(v)}
                disabled={userPermission < permission}
            /> */}
        </tr>
    );
};

export const ProfileTable = ({ user, profiles }) => {
    const profs = profiles.map((prof) => {
        let u = prof;
        console.log(u);
        if (!(prof instanceof User)) {
            u = new User(prof.id, prof.firstName, prof.lastName, prof.email, prof.permission);
        }
        u.username = prof.username;
        return <ProfileTableRow key={u.id} user={user} profile={u} />;
    });

    return (
        <table className={styles.profileTable + " total-radius"}>
            <thead>
                <tr className={styles.headerRow}>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Auth</th>
                </tr>
            </thead>
            <tbody>{profs}</tbody>
        </table>
    );
};

export const ProfilePanel = ({ user, profiles }) => {
    return (
        <TextColumn dir="col">
            <>
                <h2>List of Staff Profiles</h2>
                <ProfileTable user={user} profiles={profiles} />
            </>
        </TextColumn>
    );
};

export default ProfilePanel;
