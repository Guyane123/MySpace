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
            <main className={styles.background}>{children}</main>
        </>
    );
}
