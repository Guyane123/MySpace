"use server";

import { prisma } from "../../../lib/prisma";
import { fetchPosts } from "./fetchPosts";

export async function fetchAll(value: string) {
    const users = await prisma.user.findMany({
        where: { name: { contains: value } },
        include: { userImage: true },
    });

    const posts = await fetchPosts(0, undefined, "Home", null, value);

    return { users, posts };
}
