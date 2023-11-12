import { getCookie } from "@/app/api/cookieCategory";
import "../globals.css";
import styles from "./layout.module.css";
import NavMenu from "@/components/NavMenu/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { fetchNotifications } from "../api/notifications";
import { useContext } from "react";
import { colorContext } from "../Providers";
import fetchCurrentUser from "../api/fetchCurrentUser";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentCategory = await getCookie("currentCategory");
    const session = await getServerSession(authOptions);

    const currentUser = session ? await fetchCurrentUser() : null;

    const notifications = session ? await fetchNotifications(false) : "";
    return (
        <main className={styles.background}>
            <NavMenu
                currentUserId={currentUser?.id!}
                currentCategory={currentCategory}
                nbrOfNotifications={
                    notifications.length != 0 ? notifications.length : undefined
                }
            />
            {children}
        </main>
    );
}
