"use server";

import { Messages } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { createNotification } from "../Notifications/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchConversation } from "@/app/messages/actions";

type propsType = {
    content: string;
    conversaterId: string;
    conversatingId: string;
    authorId: string;
};

export async function sendMessage(content: string, conversatingId: string) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    await createNotification("message", conversatingId);
    const conversation = await fetchConversation(conversatingId);

    console.log(conversation);

    const record = await prisma.messages.create({
        data: {
            content: content!,
            conversaterId: conversation?.conversatingId!,
            conversatingId: conversation?.conversaterId!,
            authorId: currentUserId,
        },
    });

    revalidatePath("/");
}
