"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData, parrentId?: number) {
    
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const body = {
        content: formData.get("text") as string,
        authorId: currentUserId,
        parrentId: formData.get("parrentId")
            ? (formData.get("parrentId") as string)
            : undefined,
    };

    formData.delete("text");

    const record = await prisma.post.create({
        data: {
            ...body,
        },
    });

    console.info(body);

    revalidatePath("/");
}
