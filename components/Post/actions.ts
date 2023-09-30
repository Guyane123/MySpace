"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
    createNotification,
    deleteNotification,
} from "../Notifications/actions";

export async function handleUnlike(targetPostId: string) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

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

export async function handleLike(targetPostId: string, authorId: String) {
    const session = await getServerSession(authOptions);

    await createNotification("message", authorId, targetPostId);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    await prisma.notification.deleteMany({
        where: { postId: targetPostId, likerId: currentUserId },
    });
    await prisma.notification.deleteMany({
        where: { likingId: targetPostId, likerId: currentUserId },
    });
    await prisma.likes.create({
        data: {
            likerId: currentUserId,
            likingId: targetPostId,
        },
    });
    revalidatePath("/");
}

export async function deletePost(id: string) {
    await prisma.notification.deleteMany({ where: { postId: id } });
    await prisma.notification.deleteMany({ where: { likingId: id } });
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
