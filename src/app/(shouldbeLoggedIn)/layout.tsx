import { getCookie } from "@/components/Categories/actions";
import "../globals.css";
import NavMenu from "@/components/NavMenu/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { fetchNotifications } from "../(mustBeLoggedIn)/notifications/actions";
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
        <>
            <NavMenu
                currentUserId={currentUserId}
                currentCategory={currentCategory}
                nbrOfNotifications={
                    notifications.length != 0 ? notifications.length : undefined
                }
            />
            {children}
        </>
    );
}
