/* eslint-disable @next/next/no-img-element */
"use client";

import { PostType, UserType } from "@/app/types";
import styles from "./Post.module.css";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import PostSettings from "./PostSettings";
import { LikeButton } from "./LikeButton";
import CommentButton from "./CommentButton";

type postParam = {
    author: {
        name: string | null;
        image: string | null;
    };
    likedBy: {
        likerId: string;
        likingId: string;
    }[];
    comments: {
        id: string;
        updatedAt: Date;
        createdAt: Date;
        authorId: string;
        content: string;
        age: number | null;
        parrentId: string | null;
        isMessage: boolean;
    }[];
};

export default function Post({ post }: { post: any }) {
    const now = new Date();
    const diff = now.getTime() - post.createdAt.getTime();

    const durationSeconds = Math.ceil(diff / 1000);
    const durationMinutes = Math.ceil(durationSeconds / 60);

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
                        href={`/users/${post.author.id}`}
                        className={styles.flex}
                    >
                        <img
                            src={
                                post.author?.image ??
                                "https://thispersondoesnotexist.com"
                            }
                            alt={`${post.author.name}'s post`}
                            className={styles.img}
                        />
                        <h2 className={styles.username}>{post.author.name}</h2>
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
                <PostSettings post={post} />
            </div>
            <p className={styles.text}>{post.content}</p>
            <div className={styles.bottom}>
                <LikeButton
                    authorId={post.author.id}
                    targetPostId={post.id}
                    isUserLiking={post.isUserLiking as Boolean}
                    nbrOfLikes={post.likedBy.length}
                />
                <CommentButton
                    authorId={post.author.id}
                    post={post}
                    nbrOfComments={post.comments.length}
                />
            </div>
        </div>
    );
}