"use client";

import styles from "./layout.module.css";

import { colorContext } from "@/app/Providers";
// import "./globals.css";
import { useContext } from "react";

import s from "../../../../public/noise-light.png";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { color, setColor } = useContext(colorContext);

    return (
        <>
            <div className={styles.background}>{children}</div>
        </>
    );
}
