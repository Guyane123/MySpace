import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const targetUserId = req.nextUrl.searchParams.get("targetUserId")!;

    const currentUser = await prisma.user.findUnique({
        where: { email: currentUserEmail },
    });

    if (!currentUser) {
        return NextResponse.error();
    }

    const record = await prisma.follows.create({
        data: {
            followerId: currentUser?.id,
            followingId: targetUserId,
        },
    });

    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const currentUserId = await prisma.user
        .findUnique({
            where: { email: currentUserEmail },
        })
        .then((user) => user?.id);

    const targetUserId = req.nextUrl.searchParams.get("targetUserId");

    const record = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId!,
                followingId: targetUserId!,
            },
        },
    });

    return NextResponse.json(record);
}
