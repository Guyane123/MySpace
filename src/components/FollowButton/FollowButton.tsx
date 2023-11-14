import { getServerSession } from "next-auth";
import FollowClient from "./FollowClient";
import { prisma } from "@/../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
    targetUserId: string;
}

export async function FollowButton({ targetUserId }: Props) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const isFollowing = await prisma.follow.findFirst({
        where: {
            followerId: currentUserId,
            followingId: targetUserId,
        },
    });


    return (
        <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
    );
}
