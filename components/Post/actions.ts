"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function handleUnlike(
    currentUserId: string,
    targetPostId: string
) {
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

export async function handleLike(targetPostId: string) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

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
