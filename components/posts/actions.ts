"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function handleUnlike(
    currentUserId: string,
    targetPostId: string
) {
    "use server";
    await prisma.likes.delete({
        where: {
            likerId_likingId: {
                likerId: currentUserId,
                likingId: targetPostId,
            },
        },
    });
    revalidatePath("/");
}

export async function handleLike(currentUserId: string, targetPostId: string) {
    "use server";

    console.log(currentUserId + "ddddddddddddd");
    console.log(targetPostId);
    await prisma.likes.create({
        data: {
            likerId: currentUserId,
            likingId: targetPostId,
        },
    });
    revalidatePath("/");
}

export async function deletePost(id: string) {
    console.info("dd");

    await prisma.likes.deleteMany({
        where: { likingId: id },
    });

    await prisma.post.deleteMany({
        where: {
            parrentId: id,
        },
    });

    await prisma.post.delete({
        where: {
            id: id,
        },
    });

    revalidatePath("/");
}
