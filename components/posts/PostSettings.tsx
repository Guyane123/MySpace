"use client";

import styles from "./Post.module.css";
import { ChangeEvent, LegacyRef } from "react";
import { deletePost } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect, createRef, useRef } from "react";

type Post = {
    id: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
};

export default function PostSettings({ post }: { post: Post }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const settings = useRef<HTMLDivElement>(null);

    useEffect(() => {
        settings.current!.style.right = "16px";
        settings.current!.style.top = "16px";
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                settings.current!.style.scale = "0%";
            } else {
                settings.current!.style.scale = "100%";
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const val = e.currentTarget.value;

        if (val == "delete") {
            deletePost(post.id);
        } else if (val == "copy") {
        }
    }

    return (
        <div ref={ref} className={styles.settings_wrapper}>
            <button
                onClick={(e) => {
                    ref.current!.style.scale = "100%";
                }}
            >
                ...
            </button>
            <div ref={settings} className={styles.settings}></div>
        </div>
    );
}
