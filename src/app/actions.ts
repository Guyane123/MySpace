"use server";
import { Post } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";

export async function fetchPosts(page: number = 1) {
    const perPage = 10;

    const posts = await prisma.post.findMany({
        skip: perPage * page,
        take: perPage,
        orderBy: {
            createdAt: "desc", // Sort by createdAt field in descending order
        },
        include: {
            likedBy: true,
            comments: true,
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });

    return posts;
}
export async function getNumberOfLikes(postId: string) {
    return (await prisma.likes.findMany({ where: { likingId: postId } }))
        .length;
}
