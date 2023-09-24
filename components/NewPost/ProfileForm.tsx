"use client";

import { ChangeEvent } from "react";
import styles from "./NewPost.module.css";
import { createPost } from "./actions";

export default function ProfileForm() {
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const el = e.target;

        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }
    return (
        <form action={createPost} className={styles.form}>
            <textarea
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
