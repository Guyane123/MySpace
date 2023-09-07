"use client";

import { useSession } from "next-auth/react";
import styles from "./NewComment.module.css";
import Image from "next/image";
import CommentButton from "../Posts/CommentButton";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type propsType = {
    post: {
        authorId: string;
        content: string;
        createdAt: Date;
        id: string;
    };
    currentUserId: string;
};

export default function NewCommentForm({ post, currentUserId }: propsType) {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [pending, startTransition] = useTransition();
    const isMutating = isFetching || pending;

    const session = useSession();
    const currentUserImage = session.data?.user?.image;
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsFetching(true);

        const formData = new FormData(e.currentTarget);

        const content = formData.get("text");

        const body = {
            content: content,
            parrentId: post.id,
        };

        const res = await fetch(`/api/posts/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setIsFetching(false);

        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.top}>
                <Image
                    className={styles.img}
                    src={currentUserImage ?? "/"}
                    width={32}
                    height={32}
                    alt={"Your profile picture"}
                />
                <textarea
                    className={styles.textarea}
                    name="text"
                    cols={100}
                    rows={2}
                    placeholder="Nahhh fr ???"
                ></textarea>
            </div>

            <button className={styles.commentButton} type="submit">
                Comment
            </button>
        </form>
    );
}
