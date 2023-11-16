"use server";

import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";

export async function fetchBlocked() {
    const currentUser = await fetchCurrentUser();
    const blocked = await prisma.block.findMany({
        where: {
            authorId: currentUser?.id,
        },
        include: {
            user: true,
        },
    });

    return blocked;
}
