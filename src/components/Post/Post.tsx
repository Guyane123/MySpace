/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./Post.module.css";
import Link from "next/link";
import PostSettings from "./PostSettings";
import { LikeButton } from "./LikeButton";
import CommentButton from "./CommentButton";
import PostImage from "./PostImage";
import { ImageType, LikeType, PostType, UserType } from "@/app/types";

export interface extendedPost extends PostType {
    author: UserType;
    comments: PostType[];
    isUserLiking?: boolean | undefined | null;
    likedBy: LikeType[];
    images: ImageType[];
    currentUserId?: string;
}

export default function Post({ post }: { post: extendedPost }) {
    const now = new Date();
    const diff = now.getTime() - post.createdAt.getTime();

    const durationSeconds = Math.ceil(diff / 1000);
    const durationMinutes = Math.ceil(durationSeconds / 60);

    const durationHours = Math.ceil(
        durationMinutes >= 60 ? durationMinutes / 24 : durationMinutes
    );

    const durationDate = new Date(post.createdAt).toLocaleDateString("fr", {
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
                                post.author?.userImage ??
                                "https://thispersondoesnotexist.com"
                            }
                            alt={`${post.author!.name}'s post`}
                            className={styles.img}
                        />
                        <h2 className={styles.username}>{post.author!.name}</h2>
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

            {post.images[0] ? (
                <PostImage base64={post.images![0].binary} />
            ) : (
                ""
            )}
            <div className={styles.bottom}>
                <LikeButton
                    authorId={post.authorId}
                    targetPostId={post.id}
                    isUserLiking={post.isUserLiking as Boolean}
                    nbrOfLikes={post.likedBy!.length}
                />
                <CommentButton
                    authorId={post.authorId}
                    post={post}
                    nbrOfComments={post.comments!.length}
                />
            </div>
        </div>
    );
}