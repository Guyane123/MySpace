import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import PostContent from "../../../../components/Posts/PostContent";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;
    const targetPostId = req.nextUrl.searchParams.get("targetPostId");

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);

    const { content } = await req.json();

    const record = await prisma.comments.create({
        data: {
            content: content ?? "error",
            authorId: currentUserId ?? "error",
            postId: targetPostId ?? "error",
        },
    });

    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const commentId = Number(req.nextUrl.searchParams.get("targetPostId"));
    const { currentPostId } = await req.json();

    const record = await prisma.comments.delete({
        where: {
            postId_commentId: {
                postId: currentPostId!,
                commentId: commentId!,
            },
        },
    });

    console.info(currentPostId + "/" + commentId);

    return NextResponse.json(record);
}
