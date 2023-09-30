"use client";

import berries from "@/../public/berries.svg";
import styles from "./Spinner.module.css";
import Image from "next/image";

export default function Spinner() {
    return (
        <div className={styles.spinnerContainer}>
            <Image
                width={64}
                height={64}
                className={styles.spinner}
                src={berries}
                alt={"Loading image"}
            />
        </div>
    );
}
