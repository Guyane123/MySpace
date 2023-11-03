"use server";

import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";

export async function fetchConversations() {
    const currentUser = await fetchCurrentUser();
    const conversations = await prisma.conversations.findMany({
        where: {
            OR: [
                {
                    conversatingId: currentUser?.id,
                },
                {
                    conversaterId: currentUser?.id,
                },
            ],
        },

        include: {
            messages: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return conversations;
}
