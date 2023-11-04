"use client";

/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./NewPost.module.css";
import ProfileForm from "./ProfileForm";
import { EmojiList } from "../EmojiList/EmojiList";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

type propsType = {
    image: string;
    username: string;
    parrentId?: String | null;
};

export default function newPost({
    image,
    username,
    parrentId = null,
}: propsType) {
    return (
        <div className={styles.post}>
            <div className={styles.flex}>
                <div className={styles.img}>
                    <ProfilePicture width={38} height={38} link={undefined} />
                </div>
                <ProfileForm parrentId={parrentId} />
            </div>
        </div>
    );
}
