"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./createNotification";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export async function createPost(content: string, parrentId?: String | null) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const body = {
        content: content!,
        authorId: currentUserId,
        parrentId: parrentId ? (parrentId as string) : undefined,
    };

    await createNotification(
        "comment",
        currentUserId,
        parrentId as string | null | undefined
    );

    const record = await prisma.post.create({
        data: {
            ...body,
        },
    });

    redirect(`/users/${record.authorId}/post/${record.id}`);
}
