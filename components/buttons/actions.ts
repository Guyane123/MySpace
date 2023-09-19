"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { setCookies } from "@/app/messages/actions";

export async function createConversation(targetUserId: string) {
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: email! } })
        .then((user) => user?.id!);

    const isConversating = await prisma.conversations.findUnique({
        where: {
            conversatingId_conversaterId: {
                conversaterId: currentUserId,
                conversatingId: targetUserId,
            },
        },
    });

    console.log(!!isConversating);
    if (!!!isConversating) {
        const isOtherUserAlreadyConversating =
            await prisma.conversations.findUnique({
                where: {
                    conversatingId_conversaterId: {
                        conversaterId: targetUserId,
                        conversatingId: currentUserId,
                    },
                },
            });
        if (!!!isOtherUserAlreadyConversating) {
            const record = await prisma.conversations.create({
                data: {
                    conversatingId: targetUserId,
                    conversaterId: currentUserId,
                },
            });
        }
    }

    setCookies(currentUserId, targetUserId);

    redirect("/messages");
}
