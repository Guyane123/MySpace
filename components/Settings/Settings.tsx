import React from "react";
import Setting from "./Setting";

import styles from "./Settings.module.css";
import Link from "next/link";

const Settings = async ({
    settings,
}: {
    settings: Array<{ name: string; link: string }>;
}) => {
    return (
        <div className={styles.settings}>
            <ul>
                {settings.map((setting, k) => {
                    return (
                        <li key={k}>
                            <Setting name={setting.name} link={setting.link} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Settings;
