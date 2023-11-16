"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./createNotification";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import fetchCurrentUser from "./fetchCurrentUser";

export async function createReport(postId: string) {
    const record = await prisma.report.create({
        data: {
            postId: postId,
        },
    });
}
