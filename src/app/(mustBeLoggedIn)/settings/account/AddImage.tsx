"use client";

import styles from "./page.module.css";

import React, { useEffect, useRef } from "react";

const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;

function calculateSize(
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}

const AddImage = ({
    setImageBase64,
    image,
    width,
    heigth,
    name,
    style,
}: {
    setImageBase64: React.Dispatch<React.SetStateAction<string | undefined>>;
    image: string;
    width: number;
    heigth: number;
    name: string;
    style?: React.CSSProperties;
}) => {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        canvas.current!.width = width;
        canvas.current!.height = heigth;
        setImage(image);
    }, []);

    function setImage(url: string) {
        const img = new Image();

        img.src = url;

        img.onload = function () {
            if (canvas.current) {
                canvas.current.width = width;
                canvas.current.height = heigth;

                const ctx = canvas.current.getContext("2d")!;
                ctx.drawImage(img, 0, 0, width, heigth);

                const base64Canvas = canvas.current.toDataURL("image/jpeg");
                setImageBase64(base64Canvas);

                canvas.current.toBlob((blob) => {
                    console.log(blob);
                    return blob;
                });
            }
        };
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0]; // get the file

        const blobURL = URL.createObjectURL(file);
        setImage(blobURL);
    }

    return (
        <div className={styles.addImage} style={style}>
            <input
                className={styles.file}
                type="file"
                name={name}
                id={name}
                accept="image/jpeg, image/png, image/gif"
                onChange={(e) => handleChange(e)}
            />

            <canvas className={styles.compresser} ref={canvas}></canvas>

            <label
                htmlFor={name}
                className={styles.fileBtn}
                style={{ left: width / 2 + "px" }}
            >
                🖼️
            </label>
        </div>
    );
};

export default AddImage;
