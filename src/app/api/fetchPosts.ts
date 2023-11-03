"use server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { getCookie } from "@/app/api/cookieCategory";

export async function fetchPosts(page: number = 0) {
    const perPage = 10;

    const session = await getServerSession(authOptions);

    const currentCategory = await getCookie("currentCategory");

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const likes = await prisma.likes.findMany({
        where: { likerId: currentUserId },
    });

    const likingId = likes.map((like) => {
        return like.likingId;
    });

    const follows = await prisma.follows.findMany({
        where: { followerId: currentUserId },
    });

    const followingId = follows.map((follow) => {
        return follow.followingId;
    });

    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            parrentId: null,
        },
        skip: perPage * page,
        take: perPage, // Use take instead of skip to limit the number of results
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
        if (followingId.includes(post.id)) {
            return post;
        }
    });

    return currentCategory == "Home" ? postsWithIsUserLiking : postsByFollowed;
}
export async function getNumberOfLikes(postId: string) {
    return (await prisma.likes.findMany({ where: { likingId: postId } }))
        .length;
}
