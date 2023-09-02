"use client";

import { FormEvent, useState, useTransition } from "react";
import styles from "./NewPost.module.css";
import { useRouter } from "next/navigation";

export function ProfileForm() {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isMutating = isFetching || isPending;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsFetching(true);

        const formData = new FormData(e.currentTarget);

        const body = {
            message: formData.get("text"),
        };

        const res = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        startTransition(() => {
            router.refresh();
        });

        setIsFetching(false);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
                className={styles.textarea}
                name="text"
                cols={128}
                rows={10}
                placeholder="What's up ?"
            ></textarea>
            <button type="submit" className={styles.btn}>
                Post
            </button>
        </form>
    );
}
