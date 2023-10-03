"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { createNotification } from "../Notifications/actions";

export async function createPost(
    formData: FormData,
    parrentId?: String | null
) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const body = {
        content: formData.get("text") as string,
        authorId: currentUserId,
        parrentId: parrentId ? (parrentId as string) : undefined,
    };

    await createNotification(
        "comment",
        currentUserId,
        parrentId as string | null | undefined
    );
    formData.delete("text");

    const record = await prisma.post.create({
        data: {
            ...body,
        },
    });

    revalidatePath("/");
}
