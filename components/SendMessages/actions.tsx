"use server";

import { Messages } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

type propsType = {
    content: string;
    conversationId: string;
    authorId: string;
};

export async function sendMessage({
    conversationId,
    content,
    authorId,
}: propsType) {
    const record = await prisma.messages.create({
        data: {
            content: content!,
            conversationId: conversationId!,
            authorId: authorId,
        },
    });
    console.info(record);

    revalidatePath("/");
}
