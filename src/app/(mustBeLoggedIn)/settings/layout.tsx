import Settings from "@/components/Settings/Settings";
import styles from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Settings",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = [
        {
            name: "Your profile",
            link: "account",
        },
        {
            name: "Notifications",
            link: "notifications",
        },
        {
            name: "Blocked Users",
            link: "blocked",
        },
        {
            name: "2FA",
            link: "2FA",
        },
    ];

    return (
        <div>
            <h1 className={styles.title}>Settings</h1>
            <div className={styles.main}>
                <Settings settings={settings} />
                <div className={styles.right}>{children}</div>
            </div>
        </div>
    );
}
