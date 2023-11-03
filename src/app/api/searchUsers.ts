"use server";

import { prisma } from "../../../lib/prisma";

export async function searchUsers(name: string) {

    if (!name) {
        return null;
    }
    const users = await prisma.user.findMany({
        where: { name: { startsWith: name, mode: "insensitive" } },
    });

    return users;
}
