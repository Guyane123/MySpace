"use server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { getCookie } from "@/app/api/cookieCategory";

export async function fetchPosts(
    page: number = 0,
    authorId: undefined | string = undefined,
    category: string | undefined = "Home",
    parrentId: string | undefined | null = null,
    content: string | undefined = undefined
) {
    const perPage = 10;

    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const likes = await prisma.like.findMany({
        where: { likerId: currentUserId },
    });

    const likingId = likes.map((like) => {
        return like.likingId;
    });

    const follows = await prisma.follow.findMany({
        where: { followerId: currentUserId },
    });

    const followingId = follows.map((follow) => {
        return follow.followingId;
    });

    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: perPage * page,
        take: perPage, // Use take instead of skip to limit the number of results
        where: {
            parrentId: parrentId,
            authorId: authorId,
            // content: {
            //     contains: content ? content : undefined,
            //     mode: "insensitive",
            // },
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

    const postsWithIsUserLiking = posts.map((post) => {
        const isUserLiking = likingId.includes(post.id); // Check if the post ID is in the likingId array
        return {
            ...post,
            currentUserId,
            isUserLiking,
        };
    });

    const postsByFollowed = postsWithIsUserLiking.map((post) => {
        if (followingId.includes(post.authorId)) {
            return post;
        }
    });

    return category == "Home" ? postsWithIsUserLiking : postsByFollowed;
}
export async function getNumberOfLikes(postId: string) {
    return (await prisma.like.findMany({ where: { likingId: postId } })).length;
}
