"use server";
import { Post } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";

export default async function setCookie(name: string, value: string) {
    "use server";
    cookies().set("posts", value);
}
export async function getCookie(name: string): Promise<String> {
    "use server";
    const cookieStore = cookies();
    return cookieStore.get(name)?.value.toString()!;
}

export async function getNumberOfLikes(postId: string) {
    "use server";
    return (await prisma.likes.findMany({ where: { likingId: postId } }))
        .length;
}
