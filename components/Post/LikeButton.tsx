"use client";

import Image from "next/image";
import LikedButtonImage from "@/../public/liked.svg";
import UnLikedButtonImage from "@/../public/unliked.svg";
import styles from "./Post.module.css";
import {
    useEffect,
    experimental_useOptimistic as useOptimistic,
    useState,
} from "react";
import { handleUnlike, handleLike } from "./actions";
import Link from "next/link";
import { createNotification } from "../Notifications/actions";

type propsType = {
    targetPostId: string;
    authorId: string;
    isUserLiking: Boolean;
    nbrOfLikes: number;
};

export function LikeButton({
    targetPostId,
    isUserLiking,
    nbrOfLikes,
    authorId,
}: propsType) {
    const [isLiking, setIsLiking] = useState(isUserLiking);
    const likeCount = nbrOfLikes;

    const [optimisticLikes, addOptimisticLikes] = useOptimistic(
        { likeCount, sending: false },
        (state, newLikeCount) => ({
            ...state,
            likeCount: newLikeCount as number,
            sending: true,
        })
    );

    return (
        <>
            <button
                className={styles.likeButton}
                onClick={async () => {
                    setIsLiking((isLinking) => !isLiking);
                    addOptimisticLikes(
                        !isLiking
                            ? optimisticLikes.likeCount + 1
                            : optimisticLikes.likeCount - 1
                    );
                    !isLiking
                        ? await handleLike(targetPostId, targetPostId)
                        : await handleUnlike(targetPostId);
                    await createNotification("like", authorId, targetPostId);
                }}
            >
                <Image
                    src={
                        optimisticLikes.sending
                            ? isLiking
                                ? LikedButtonImage
                                : UnLikedButtonImage
                            : isLiking
                            ? LikedButtonImage
                            : UnLikedButtonImage
                    }
                    alt={""}
                    height={16}
                    width={16}
                />
            </button>
            <p className={styles.nbr}>{optimisticLikes.likeCount}</p>
        </>
    );
}