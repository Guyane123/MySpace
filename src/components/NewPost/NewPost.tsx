"use client";

/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./NewPost.module.css";
import ProfileForm from "./ProfileForm";
import { EmojiList } from "../EmojiList/EmojiList";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { useRef, useState } from "react";

type propsType = {
    image: string;
    username: string;
    parrentId?: String | null;
};

export default function NewPost({
    image,
    username,
    parrentId = null,
}: propsType) {



    const canvas = useRef<HTMLCanvasElement | null>(null);
    return (
        <div className={styles.post}>
            <div className={styles.flex}>
                <div className={styles.img}>
                    <ProfilePicture width={38} height={38} link={undefined} />
                </div>
                <ProfileForm parrentId={parrentId} canvas={canvas} />
            </div>

            <canvas
                ref={canvas!}
                className={styles.compresser}
                width={0}
                height={0}
            ></canvas>
        </div>
    );
}
