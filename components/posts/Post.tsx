/* eslint-disable @next/next/no-img-element */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import DeleteButton from "./DeleteButton";
import styles from "./Post.module.css";
import { getServerSession } from "next-auth";
import { LikeButton } from "./LikeButton";
import Link from "next/link";
import CommentButton from "./CommentButton";
type Props = {
    post: {
        id: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    };
};

export default async function Post({ post: post }: Props) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email ?? "error" } })
        .then((user) => user?.id);

    const user = await prisma.user.findFirst({
        where: { id: post.authorId },
    });

    const nbrOfComments = (
        await prisma.post.findMany({ where: { parrentId: post.id } })
    ).length;

    const like = await prisma.likes.findUnique({
        where: {
            likerId_likingId: {
                likerId: currentUserId!,
                likingId: post.id,
            },
        },
    });

    const now = new Date();
    const diff = now.valueOf() - post.createdAt.valueOf();

    const durationSeconds = Math.ceil(diff / 1000);
    const durationMinutes = Math.ceil(durationSeconds / 60);

    const nbrOfLikes = (
        await prisma.likes.findMany({ where: { likingId: post.id } })
    ).length;

    const durationHours = Math.ceil(
        durationMinutes >= 60 ? durationMinutes / 24 : durationMinutes
    );

    const durationDate = new Date(diff).toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
    });

    return (
        <div className={styles.post}>
            <div className={styles.top}>
                <div className={styles.flex}>
                    <Link
                        href={`/users/${post.authorId}`}
                        className={styles.flex}
                    >
                        <img
                            src={
                                user?.image ??
                                "https://thispersondoesnotexist.com"
                            }
                            alt={`${user?.name}'s post`}
                            className={styles.img}
                        />
                        <h2 className={styles.username}>{user?.name}</h2>
                    </Link>
                    <h3 className={styles.postInfo}>
                        {durationSeconds >= 60
                            ? durationMinutes >= 60
                                ? durationHours >= 24
                                    ? durationDate
                                    : durationHours + "h"
                                : durationMinutes + "min"
                            : durationSeconds + "s"}
                    </h3>
                </div>
                <DeleteButton post={post} currentUserId={currentUserId!} />
            </div>
            <p className={styles.text}>{post.content}</p>
            <div className={styles.bottom}>
                <LikeButton
                    isLiking={!!like}
                    currentUserId={currentUserId!}
                    targetPostId={post.id}
                />
                <p className={styles.nbr}>{nbrOfLikes}</p>
                <CommentButton postId={post.id} currentUserId={post.authorId} />
                <p className={styles.nbr}>{nbrOfComments}</p>
            </div>
        </div>
    );
}
