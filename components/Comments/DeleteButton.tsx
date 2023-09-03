/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useTransition } from "react";
import DeleteButtonImage from "../../public/trash.svg";
import styles from "./Comment.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    comment: {
        id: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    currentUserId: string;
    postId: string;
};

export default function DeleteButton({
    postId,
    comment,
    currentUserId,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isFetching, setIsFetching] = useState(false);
    const [pending, startTransition] = useTransition();
    const isMutating = isFetching || pending;

    async function handleClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        setIsFetching(true);

        const data = {
            currentPostId: postId,
        };

        const res = await fetch(`/api/comment?targetPostId=${comment.id}`, {
            method: "DELETE",
            body: JSON.stringify(data),
        });
        setIsFetching(false);

        startTransition(() => router.refresh());
    }

    if (comment.authorId == currentUserId) {
        return (
            <button className={styles.btn} onClick={handleClick}>
                <Image
                    src={DeleteButtonImage}
                    alt="Delete Button"
                    width={16}
                    height={16}
                />
            </button>
        );
    }
}
