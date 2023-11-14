/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import styles from "./Post.module.css";

const PostImage = ({ base64 }: { base64: string }) => {
    const image = useRef<HTMLImageElement | null>(null);

    if (image.current) {
        if (base64) {
            image.current.src = base64;

            const width = image.current.style.width;
            const heigth = image.current.style.height;

            image.current.style.width = `${width}px!important`;
            image.current.style.height = `${heigth}px!important`;
        }
    }

    return (
        <img
            ref={image!}
            src={base64}
            alt="image"
            className={styles.canvas}
        ></img>
    );
};

export default PostImage;
