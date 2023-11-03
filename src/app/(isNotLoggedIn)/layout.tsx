"use client";

import styles from "./layout.module.css";

import { colorContext } from "@/app/Providers";
// import "./globals.css";
import { useContext } from "react";


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
