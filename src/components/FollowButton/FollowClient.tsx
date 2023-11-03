"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import styles from "./FollowButton.module.css";
import { follow, unFollow } from "../../app/api/follow";

export default function FollowClient({
    isFollowing,
    targetUserId,
}: {
    isFollowing: boolean;
    targetUserId: string;
}) {
    const [optimisticFollow, addOptimiticFollow] = useOptimistic(
        { isFollowing, sending: false },
        (state, newIsFollowing) => ({
            ...state,
            isFollowing: newIsFollowing as boolean,
            sending: true,
        })
    );

    return (
        <button
            className={styles.followBtn}
            onClick={async () => {
                addOptimiticFollow(
                    (optimisticFollow.isFollowing =
                        !optimisticFollow.isFollowing)
                );

                optimisticFollow.isFollowing
                    ? await follow(targetUserId)
                    : await unFollow(targetUserId);
            }}
        >
            {optimisticFollow.isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}
