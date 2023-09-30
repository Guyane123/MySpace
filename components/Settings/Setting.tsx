import Link from "next/link";
import React from "react";

import styles from "./Settings.module.css";

type propsType = {
    name: String;
    link: String;
};

const Setting = async ({ name, link }: propsType) => {
    return (
        <div className={styles.setting}>
            <Link href={`/settings/${link}`} className={styles.a}>
                <span>{name}</span>
                <button>{">"}</button>
            </Link>
        </div>
    );
};

export default Setting;
