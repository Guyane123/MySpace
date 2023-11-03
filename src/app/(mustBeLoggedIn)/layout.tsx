import "../globals.css";

import styles from "./layout.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { fetchNotifications } from "../api/notifications";
import { getCookie } from "@/app/api/cookieCategory";
import NavMenu from "@/components/NavMenu/NavMenu";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import CheckSession from "@/components/CheckSession/CheckSession";

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
    const session = await getServerSession(authOptions);

    await CheckSession();

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const notifications = await fetchNotifications(false);
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
