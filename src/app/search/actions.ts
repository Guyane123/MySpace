import setCookie from "@/components/Categories/actions";
import { prisma } from "../../../lib/prisma";
import { PostType, UserType } from "../types";

export async function fetchAll(value: string) {
    const users = await prisma.user.findMany({
        where: { name: { contains: value } },
    });
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            content: {
                contains: value,
                mode: "insensitive",
            },
        },
        include: {
            likedBy: true,
            comments: true,
            author: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                },
            },
        },
    });

    return { users, posts };
}
