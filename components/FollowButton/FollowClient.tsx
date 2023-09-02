"use client";

import { useState, useTransition } from "react";
import styles from "./FollowButton.module.css";
import { useRouter } from "next/navigation";

export default function FollowClient({
    isFollowing,
    targetUserId,
}: {
    isFollowing: boolean;
    targetUserId: string;
}) {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isMutating = isFetching || isPending;

    if (!targetUserId) {
        targetUserId = "RANDOMID2";
    }

    async function follow() {
        setIsFetching((isFetching) => true);

        const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        });

        setIsFetching(false);

        console.log(res);

        startTransition(() => {
            router.refresh();
        });
    }

    const unfollow = async () => {
        setIsFetching(true);

        const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
            method: "DELETE",
        });

        setIsFetching(false);
        startTransition(() => router.refresh());
    };

    if (isFollowing) {
        return (
            <button onClick={unfollow}>
                {!isMutating ? "Unfollow" : "..."}
            </button>
        );
    } else {
        return (
            <button onClick={follow}>{!isMutating ? "Follow" : "..."}</button>
        );
    }
}
