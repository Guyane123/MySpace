"use client";

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

    return (
        <button
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
