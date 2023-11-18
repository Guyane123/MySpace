import "../globals.css";

import styles from "./layout.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fetchNotifications } from "../api/notifications";
import { getCookie } from "@/app/api/cookieCategory";
import NavMenu from "@/components/NavMenu/NavMenu";
import fetchCurrentUser from "../api/fetchCurrentUser";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CheckSession from "../../../lib/CheckSession";

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
    await CheckSession();
    const currentCategory = await getCookie("currentCategory");

    const currentUser = await fetchCurrentUser();

    const notifications = await fetchNotifications(false);
    return (
        <>
            <NavMenu
                currentUserId={currentUser!.id}
                currentCategory={currentCategory}
                nbrOfNotifications={
                    notifications.length != 0 ? notifications.length : undefined
                }
            />
            <main className={`${styles.main} ${styles.background}`}>
                {children}
            </main>
        </>
    );
}
