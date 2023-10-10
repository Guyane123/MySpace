"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { fetchConversation, setCookies } from "@/app/messages/actions";
import { prisma } from "../../../lib/prisma";

export async function createConversation(targetUserId: string) {
    const conversation = await fetchConversation(targetUserId);

    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    conversation
        ? conversation
        : await prisma.conversations.create({
              data: {
                  updatedAt: new Date(),
                  conversatingId: targetUserId,
                  conversaterId: currentUserId,
              },
          });

    redirect(`/messages/${targetUserId}`);
}
