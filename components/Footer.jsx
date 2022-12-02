/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */
import { FlexRow } from "./Flex";
import { TbKarate } from "react-icons/tb";

export const Footer = () => {
    const FOOTER_TEXT = "Made by Team 24: Leo Henon, Antonio Vasquez-Mackay, Connor Doman, and Eric Launer.";
    return (
        <footer className="footer">
            <FlexRow>
                <p>{FOOTER_TEXT}</p>
                <p>
                    <TbKarate />
                </p>
            </FlexRow>
        </footer>
    );
};

export default Footer;
