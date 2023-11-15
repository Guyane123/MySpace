"use client";

import styles from "./AddImage.module.css";

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
    canvas,
    setImageBase64,
}: {
    canvas: React.MutableRefObject<HTMLCanvasElement | null>;
    setImageBase64: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    useEffect(() => {
        canvas.current!.width = 0;
        canvas.current!.height = 0;
    }, [canvas]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0]; // get the file

        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;

        img.onload = function () {
            const [newWidth, newHeight] = calculateSize(
                img,
                MAX_WIDTH,
                MAX_HEIGHT
            );
            if (canvas.current) {
                canvas.current.width = newWidth;
                canvas.current.height = newHeight;

                const ctx = canvas.current.getContext("2d")!;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                const base64Canvas = canvas.current.toDataURL("image/jpeg");
                setImageBase64(base64Canvas);

                canvas.current.toBlob((blob) => {
                    console.log(blob);
                    return blob;
                });
            }
        };
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if (canvas.current) {
            const ctx = canvas.current.getContext("2d")!;

            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

            canvas.current.width = 0;
            canvas.current.height = 0;

            setImageBase64(undefined);
        }
    }
    return (
        <>
            <label htmlFor="file" className={styles.label}>
                🖼️
            </label>
            <input
                className={styles.input}
                type="file"
                name="file"
                id="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={(e) => handleChange(e)}
            />

            {canvas.current ? (
                canvas.current.width > 0 ? (
                    <button
                        className={styles.btn}
                        onClick={(e) => handleClick(e)}
                    >
                        X
                    </button>
                ) : (
                    ""
                )
            ) : (
                ""
            )}
        </>
    );
};

export default AddImage;
