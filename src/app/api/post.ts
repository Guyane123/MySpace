"use server";

import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createNotification, deleteNotification } from "./createNotification";
import { prisma } from "../../../lib/prisma";

export async function handleUnlike(targetPostId: string) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    await prisma.notification.deleteMany({
        where: {
            notificationAuthorId: currentUserId,
            postId: targetPostId,
            type: "like",
        },
    });

    await prisma.like.delete({
        where: {
            likerId_likingId: {
                likerId: currentUserId,
                likingId: targetPostId,
            },
        },
    });
    revalidatePath("/");
}

export async function handleLike(targetPostId: string, authorId: String) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    console.log(authorId);
    console.log(targetPostId);
    await createNotification("like", authorId, targetPostId);

    await prisma.like.create({
        data: {
            likerId: currentUserId,
            likingId: targetPostId,
        },
    });
    revalidatePath("/");
}

export async function deletePost(id: string) {
    await prisma.notification.deleteMany({
        where: {
            postId: id,
        },
    });
    await prisma.like.deleteMany({
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
