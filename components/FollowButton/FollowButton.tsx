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

    const isFollowing = await prisma.follows.findFirst({
        where: {
            followerId: currentUserId,
            followingId: targetUserId,
        },
    });


    console.log(!!isFollowing + "ddddddddddddddddddd");
    return (
        <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
    );
}
