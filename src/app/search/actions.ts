import { prisma } from "../../../lib/prisma";
import { PostType, UserType } from "../types";

export async function fetchAll(value: string) {
    const users = await prisma.user.findMany({
        where: { name: { contains: value } },
    });
    const posts = await prisma.post.findMany({
        where: { content: { contains: value } },
    });

    return { users, posts };
}
