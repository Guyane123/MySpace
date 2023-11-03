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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentCategory = await getCookie("currentCategory");
    const session = await getServerSession(authOptions);

    const currentUserId = session
        ? await prisma.user
              .findUnique({ where: { email: session?.user?.email! } })
              .then((user) => user?.id!)
        : null;

    const notifications = session ? await fetchNotifications(false) : "";
    return (
        <div className={styles.background}>
            <NavMenu
                currentUserId={currentUserId}
                currentCategory={currentCategory}
                nbrOfNotifications={
                    notifications.length != 0 ? notifications.length : undefined
                }
            />
            {children}
        </div>
    );
}
