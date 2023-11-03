"use server";

import { prisma } from "../../../lib/prisma";

export async function fetchUsers(value: string) {
    const users = await prisma.user.findMany({
        where: { name: { contains: value } },
    });

    return users;
}
