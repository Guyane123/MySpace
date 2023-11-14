"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./createNotification";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import { createImage } from "./createImage";

export async function createPost(
    content: string,
    parrentId?: String | null,
    image: string | undefined = undefined
) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const body = {
        content: content!,
        authorId: currentUserId,
        parrentId: parrentId ? (parrentId as string) : undefined,
    };

    const record = await prisma.post.create({
        data: {
            ...body,
        },
    });

    if (image) {
        createImage(image, "desc", "name", record.id);
    }

    redirect(`/users/${record.authorId}/post/${record.id}`);
}
