"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./EmojiList.module.css";
import emojis from "@/../public/emojis.json";
import { Emoji } from "../Emoji/Emoji";

type EmojiListType = {
    setValue: (value: React.SetStateAction<string>) => void;
    selectionStart: number;
    value: string;
};

type EmojiType = {
    name: string;
    emoji: string;
};

export function EmojiList({ setValue, selectionStart, value }: EmojiListType) {
    const ref = useRef<HTMLDivElement | null>(null);

    const [search, setSearch] = useState<string>();

    function addEmoji(unicode: string) {
        const newValue =
            value.slice(0, selectionStart) +
            unicode +
            value.slice(selectionStart);

        setValue(newValue);
    }
    const emojiList = useRef<HTMLDivElement | null>(null);
    const categories = [
        {
            name: "Smileys and People",
            groups: ["Smiley", "Gesture", "Person", "Clothing"],
            emojis: [""],
        },
        {
            name: "Animals and Nature",
            emojis: [""],
            groups: ["Animal", "Nature"],
        },
        { name: "Food and Drink", emojis: [""], groups: ["Food"] },
        { name: "Activity", emojis: [""], groups: ["Activity"] },
        { name: "Travel and Places", emojis: [""], groups: ["Travel"] },
        { name: "Objects", emojis: [""], groups: ["Object"] },
        { name: "Symbols", emojis: [""], groups: ["Symbol"] },
        {
            name: "Flags and Countries",
            emojis: [],
            groups: ["Flag", "Country"],
        },
        { name: "Custom", emojis: [""], groups: ["Custom"] },
    ];

    emojis.forEach((e) => {
        const categorie = categories.find((c) => {
            if (c.groups.indexOf(e.category) > -1) {
                return c;
            }
        });

        categorie?.emojis.push(e.unicode);
    });

    useEffect(() => {
        emojiList.current!.style.right = "16px";
        emojiList.current!.style.top = "64px";
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                emojiList.current!.style.scale = "0%";
            } else {
                emojiList.current!.style.scale = "100%";
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    return (
        <div ref={ref} className={styles.emojisContainer}>
            <div className={styles.emoji} onClick={(e) => handleClick(e)}>
                😋
            </div>

            <div className={styles.emojisList} ref={emojiList}>
                <input
                    type="text"
                    name="text"
                    id="text"
                    className={styles.input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {categories.map((c, k) => {
                    return (
                        <div className={styles.category} key={k}>
                            <p className={styles.categoryName}>{c.name}</p>

                            <div className={styles.emojis}>
                                {c.emojis.map((e, k) => {
                                    return (
                                        <Emoji
                                            key={k}
                                            unicode={e}
                                            addEmoji={addEmoji}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
