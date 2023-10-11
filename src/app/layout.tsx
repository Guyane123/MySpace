import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";

import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { fetchNotifications } from "./notifications/actions";
import { getCookie } from "@/components/Categories/actions";
import NavMenu from "@/components/NavMenu/NavMenu";
import { redirect } from "next/navigation";

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

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const notifications = await fetchNotifications(false);
    return (
        <Providers>
            <html lang="fr">
                <body className={inter.className}>
                    <NavMenu
                        currentUserId={currentUserId}
                        currentCategory={currentCategory}
                        nbrOfNotifications={
                            notifications.length != 0
                                ? notifications.length
                                : undefined
                        }
                    />

                    {children}
                </body>
            </html>
        </Providers>
    );
}
