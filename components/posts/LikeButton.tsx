"use client";

import Image from "next/image";
import LikedButtonImage from "@/../public/liked.svg";
import UnLikedButtonImage from "@/../public/unliked.svg";
import styles from "./Post.module.css";
import { experimental_useOptimistic as useOptimistic } from "react";
import { handleUnlike, handleLike } from "./actions";
import { getNumberOfLikes } from "@/app/actions";
import NumberOfLikes from "./NumberOfLikes";

type propsType = {
    targetPostId: string;
    currentUserId: string;
    isLiking: boolean;
    children: React.ReactNode;
    // numberOfLikes: number;
};

export function LikeButton({
    targetPostId,
    currentUserId,
    isLiking,
    children,
}: propsType) {
    console.log(children);
    const likeCount = 0;
    const [optimisticLikes, addOptimisticLikes] = useOptimistic(
        { likeCount, sending: false },
        (state, newLikeCount) => ({
            ...state,
            likeCount: newLikeCount as number,
            sending: true,
        })
    );

    console.log(currentUserId);
    if (!isLiking) {
        return (
            <>
                <button
                    className={styles.likeButton}
                    onClick={async () => {
                        addOptimisticLikes(optimisticLikes.likeCount + 1);
                        await handleLike(currentUserId, targetPostId);
                    }}
                >
                    <Image
                        src={
                            optimisticLikes.sending
                                ? LikedButtonImage
                                : UnLikedButtonImage
                        }
                        alt="like button"
                        height={16}
                        width={16}
                    />
                </button>
                <p className={styles.nbr}>{optimisticLikes.likeCount}</p>
            </>
        );
    } else {
        return (
            <>
                <button
                    className={styles.likeButton}
                    onClick={async () => {
                        addOptimisticLikes(optimisticLikes.likeCount - 1);
                        await handleUnlike(currentUserId, targetPostId);
                    }}
                >
                    <Image
                        src={
                            optimisticLikes.sending
                                ? UnLikedButtonImage
                                : LikedButtonImage
                        }
                        alt="Unlike button"
                        height={16}
                        width={16}
                    />
                </button>
                <p className={styles.nbr}>{children}</p>
            </>
        );
    }
}
