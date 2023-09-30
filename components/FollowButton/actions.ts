"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "../Notifications/actions";

export async function follow(targetUserId: string) {
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: email! } })
        .then((user) => user?.id!);

    await createNotification("follow", currentUserId, targetUserId);
    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId,
        },
    });

    revalidatePath("/");
}

export async function unFollow(targetUserId: string) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const currentUserId = await prisma.user
        .findUnique({
            where: { email: currentUserEmail },
        })
        .then((user) => user?.id);

    const record = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId!,
                followingId: targetUserId!,
            },
        },
    });

    revalidatePath("/");
}
