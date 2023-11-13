"use server";

import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";

export async function fetchConversations() {
    const currentUser = await fetchCurrentUser();
    const conversations = await prisma.conversation.findMany({
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


    
    return conversations.filter((c) => c.messages.length > 0);
}
