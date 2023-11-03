"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export async function changeNotificationsSettings(
    name: String,
    value: boolean
) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const data = {
        [name as string]: value,
    };

    await prisma.setting.update({
        where: { userId: currentUserId },
        data: data,
    });
}
