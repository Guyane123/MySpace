"use client";

import Image from "next/image";
import LikedButtonImage from "@/../public/liked.svg";
import UnLikedButtonImage from "@/../public/unliked.svg";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./Post.module.css";

type propsType = {
    targetPostId: string;
    currentUserId: string;
    isLiking: boolean;
};

export function LikeButton({
    targetPostId,
    currentUserId,
    isLiking,
}: propsType) {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [pending, startTransition] = useTransition();
    const isMutating = isFetching || pending;

    async function handleLike() {
        setIsFetching(true);

        const res = await fetch(`/api/like?targetPostId=${targetPostId}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        });

        console.log(res);

        setIsFetching(false);

        startTransition(() => router.refresh());
    }

    async function handleUnlike() {
        setIsFetching(true);

        const res = await fetch(`/api/like?targetPostId=${targetPostId}`, {
            method: "DELETE",
        });

        setIsFetching(false);

        startTransition(() => router.refresh());
    }

    if (!isLiking) {
        return (
            <button className={styles.likeButton} onClick={() => handleLike()}>
                {/* <Image
                    src={LikedButtonImage}
                    alt="Like button"
                    height={16}
                    width={16}
                /> */}
                {isMutating ? (
                    <Image
                        src={LikedButtonImage}
                        alt="like button"
                        height={16}
                        width={16}
                    />
                ) : (
                    <Image
                        src={UnLikedButtonImage}
                        alt="Unlike button"
                        height={16}
                        width={16}
                    />
                )}
            </button>
        );
    } else {
        return (
            <button
                className={styles.likeButton}
                onClick={() => handleUnlike()}
            >
                {isMutating ? (
                    <Image
                        src={UnLikedButtonImage}
                        alt="Unlike button"
                        height={16}
                        width={16}
                    />
                ) : (
                    <Image
                        src={LikedButtonImage}
                        alt="like button"
                        height={16}
                        width={16}
                    />
                )}
            </button>
        );
    }
}
