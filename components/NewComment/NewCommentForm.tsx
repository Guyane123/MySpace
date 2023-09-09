"use client";

import { useSession } from "next-auth/react";
import styles from "./NewComment.module.css";
import Image from "next/image";
import { createPost } from "../NewPost/actions";

type propsType = {
    post: {
        authorId: string;
        content: string;
        createdAt: Date;
        id: string;
    };
};

export default function NewCommentForm({ post }: propsType) {
    const session = useSession();
    const currentUserImage = session.data?.user?.image;

    return (
        <form action={createPost}>
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
                <input
                    type="text"
                    name="parrentId"
                    defaultValue={post.id}
                    style={{ visibility: "hidden" }}
                />
            </div>

            <button className={styles.commentButton} type="submit">
                Comment
            </button>
        </form>
    );
}
