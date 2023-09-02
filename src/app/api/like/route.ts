import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const currentUser = await prisma.user.findUnique({
        where: { email: currentUserEmail },
    });

    const targetPostId = req.nextUrl.searchParams.get("targetPostId");

    const record = await prisma.likes.create({
        data: {
            likerId: currentUser!.id,
            likingId: targetPostId!,
        },
    });

    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email;
    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id!);
    const targetPostId = req.nextUrl.searchParams.get("targetPostId");

    const record = await prisma.likes.delete({
        where: {
            likerId_likingId: {
                likingId: targetPostId!,
                likerId: currentUserId,
            },
        },
    });

    return NextResponse.json(record);
}

export async function GET(res: NextResponse) {}
