"use client";

import Link from "next/link";
import styles from "./Categories.module.css";
import setCookie from "../../app/api/cookieCategory";

export default function Categories() {
    return (
        <div>
            <ul className={styles.list}>
                <li
                    onClick={() => {
                        setCookie("currentCategory", "Home");
                    }}
                >
                    Home
                </li>
                <li
                    onClick={() => {
                        setCookie("currentCategory", "Subscribtions");
                    }}
                >
                    Subscribtions
                </li>
            </ul>
        </div>
    );
}
