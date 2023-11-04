import "../globals.css";

import styles from "./layout.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fetchNotifications } from "../api/notifications";
import { getCookie } from "@/app/api/cookieCategory";
import NavMenu from "@/components/NavMenu/NavMenu";
import CheckSession from "@/components/CheckSession/CheckSession";
import fetchCurrentUser from "../api/fetchCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PinkBerries",
    description: "Next js social media",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentCategory = await getCookie("currentCategory");

    // await CheckSession();

    const currentUser = await fetchCurrentUser();

    const notifications = await fetchNotifications(false);
    return (
        <div className={styles.background}>
            <NavMenu
                currentUserId={currentUser!.id}
                currentCategory={currentCategory}
                nbrOfNotifications={
                    notifications.length != 0 ? notifications.length : undefined
                }
            />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
