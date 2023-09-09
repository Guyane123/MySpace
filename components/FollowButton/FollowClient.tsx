"use client";

import styles from "./FollowButton.module.css";
import { experimental_useOptimistic as useOptimistic } from "react";
import { follow, unFollow } from "./actions";

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
    if (!targetUserId) {
        targetUserId = "RANDOMID2";
    }

    if (isFollowing) {
        return (
            <button
                onClick={async () => {
                    addOptimiticFollow(
                        (optimisticFollow.isFollowing =
                            !optimisticFollow.isFollowing)
                    );
                    await unFollow(targetUserId);
                }}
            >
                {optimisticFollow.isFollowing ? "Follow" : "Unfollow"}
            </button>
        );
    } else {
        return (
            <button
                onClick={async () => {
                    addOptimiticFollow(
                        (optimisticFollow.isFollowing =
                            !optimisticFollow.isFollowing)
                    );
                    await follow(targetUserId);
                }}
            >
                {optimisticFollow.isFollowing ? "Follow" : "Unfollow"}
            </button>
        );
    }
}
