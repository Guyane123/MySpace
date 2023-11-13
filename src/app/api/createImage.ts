"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./createNotification";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export async function createPost(image: Buffer, desc: string, name: string) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const record = await prisma.image.create({
        data: {
            authorId: currentUserId,
            binary: image,
            desc: desc,
            name: name,
        },
    });

    redirect(`/users/${record.authorId}/post/${record.id}`);
}
