"use client";

import { ChangeEvent, useRef, useState } from "react";
import styles from "./NewPost.module.css";
import { createPost } from "../../app/api/createPost";
import { EmojiList } from "../EmojiList/EmojiList";

export default function ProfileForm({
    parrentId,
}: {
    parrentId?: String | null;
}) {
    const [value, setValue] = useState("");
    const ref = useRef<HTMLTextAreaElement | null>(null);
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const el = e.target;

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const content = ref.current?.value;
        createPost(content!, parrentId);

        ref.current!.value = "";
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
            name="newPostForm "
        >
            {/* <EmojiList input={ref} /> */}
            <textarea
                ref={ref}
                maxLength={280}
                className={styles.text}
                name="text"
                cols={1}
                rows={1}
                onChange={(e) => handleChange(e)}
                placeholder="What's up ?"
            ></textarea>

            <button type="submit" className={styles.btn}>
                Post
            </button>
        </form>
    );
}
