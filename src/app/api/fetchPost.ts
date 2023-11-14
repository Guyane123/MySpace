"use server";

import { prisma } from "../../../lib/prisma";

export async function fetchPost(postId: string) {
    const postWithMoreInfo = await prisma.post.findUnique({
        where: {
            id: postId,
        },

        include: {
            likedBy: true,
            comments: true,
            author: true,
            images: true,
        },
    });

    return postWithMoreInfo;
}
