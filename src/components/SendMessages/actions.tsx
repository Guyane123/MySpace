"use server";

import { Messages } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createNotification } from "../../app/api/createNotification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { fetchConversation } from "@/app/api/cookie";

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
            conversaterId: conversation?.conversaterId!,
            conversatingId: conversation?.conversatingId!,
            authorId: currentUserId,
        },
    });

    revalidatePath("/");
}
