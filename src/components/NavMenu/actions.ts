"use server";

import { prisma } from "../../../lib/prisma";

export async function searchUsers(name: string) {
    const users = await prisma.user.findMany({
        where: { name: { startsWith: name } },
    });

    return users;
}
