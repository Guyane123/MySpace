"use client";

import Image from "next/image";
import LikedButtonImage from "@/../public/liked.svg";
import UnLikedButtonImage from "@/../public/unliked.svg";
import styles from "./Post.module.css";
import { experimental_useOptimistic as useOptimistic } from "react";
import { handleUnlike, handleLike } from "./actions";
import { getNumberOfLikes } from "@/app/actions";

type propsType = {
    targetPostId: string;
    nbrOfLikes: number;
};

export function LikeButton({ targetPostId, nbrOfLikes }: propsType) {
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
                    addOptimisticLikes(optimisticLikes.likeCount + 1);
                    await handleLike(targetPostId);
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
            <p className={styles.nbr}>{nbrOfLikes}</p>
        </>
    );

    //     if (!isLiking) {
    //         return (
    //             <>
    //                 <button
    //                     className={styles.likeButton}
    //                     onClick={async () => {
    //                         addOptimisticLikes(optimisticLikes.likeCount + 1);
    //                         await handleLike(currentUserId, targetPostId);
    //                     }}
    //                 >
    //                     <Image
    //                         src={
    //                             optimisticLikes.sending
    //                                 ? LikedButtonImage
    //                                 : UnLikedButtonImage
    //                         }
    //                         alt="like button"
    //                         height={16}
    //                         width={16}
    //                     />
    //                 </button>
    //                 <p className={styles.nbr}>{optimisticLikes.likeCount}</p>
    //             </>
    //         );
    //     } else {
    //         return (
    //             <>
    //                 <button
    //                     className={styles.likeButton}
    //                     onClick={async () => {
    //                         addOptimisticLikes(optimisticLikes.likeCount - 1);
    //                         await handleUnlike(currentUserId, targetPostId);
    //                     }}
    //                 >
    //                     <Image
    //                         src={
    //                             optimisticLikes.sending
    //                                 ? UnLikedButtonImage
    //                                 : LikedButtonImage
    //                         }
    //                         alt="Unlike button"
    //                         height={16}
    //                         width={16}
    //                     />
    //                 </button>
    //                 <p className={styles.nbr}>{optimisticLikes.likeCount}</p>
    //             </>
    //         );
    //     }
    // }
}
