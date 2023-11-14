"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./createNotification";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import fetchCurrentUser from "./fetchCurrentUser";

export async function createImage(
    image: string,
    desc: string,
    name: string,
    postId: string
) {
    const currentUser = await fetchCurrentUser();

    const currentUserId = currentUser?.id;

    const record = await prisma.image.create({
        data: {
            authorId: currentUserId!,
            binary: image,
            name: name,
            desc: desc,
            postId: postId,
        },
    });
}
