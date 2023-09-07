import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import PostContent from "../../../../components/Posts/PostContent";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);

    const { content, parrentId } = await req.json();

    const record = await prisma.post.create({
        data: {
            content: content ?? "error",
            authorId: currentUserId ?? "error",
            parrentId: parrentId ?? "error",
        },
    });

    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const postId = req.nextUrl.searchParams.get("targetPostId");

    const record = await prisma.post.delete({
        where: {
            id: postId!,
        },
    });

    return NextResponse.json(record);
}
