import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


type data = {
    content: string;
    authorId: string;
    parrentId?: string;
};

export async function GET(request: Request) {
    const messages = await prisma.post.findMany();

    return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
    const data: data = await req.json();
    const session = await getServerSession(authOptions);
    // const parrentId = data.parrentId ?? data.parrentId;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const record = await prisma.post.create({
        data: {
            ...data,
            authorId: currentUserId,
        },
    });

    console.info(record);
    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const urlId = req.nextUrl.searchParams.get("targetPostId") ?? "error";

    const likes = await prisma.likes.deleteMany({ where: { likingId: urlId } });

    const record = await prisma.post.delete({
        where: {
            id: urlId,
        },
    });

    return NextResponse.json(record);
}
