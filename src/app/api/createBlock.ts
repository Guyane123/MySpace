"use server";



import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";

export async function createBlock(userId: string) {
    const currentUser = await fetchCurrentUser();

    const currentUserId = currentUser?.id!;

    const record = await prisma.block.create({
        data: {
            authorId: currentUserId,
            userId: userId,
        },
    });
}
