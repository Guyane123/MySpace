"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./EmojiList.module.css";
import emojis from "@/../public/emojis.json";
import { Emoji } from "../Emoji/Emoji";
import Search from "@/../public/search.svg";
import Image from "next/image";

type EmojiListType = {
    setValue: (value: React.SetStateAction<string>) => void;
    selectionStart: number;
    value: string;
    style?: React.CSSProperties | undefined;
};

type EmojiType = {
    name: string;
    emoji: string;
};

const placeholder = {
    alias: "" as string | Array<string>,
    unicode: "",
};

export function EmojiList({
    setValue,
    selectionStart,
    value,
    style = undefined,
}: EmojiListType) {
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
            emojis: [placeholder],
        },
        {
            name: "Animals and Nature",
            emojis: [placeholder],
            groups: ["Animal", "Nature"],
        },
        { name: "Food and Drink", emojis: [placeholder], groups: ["Food"] },
        { name: "Activity", emojis: [placeholder], groups: ["Activity"] },
        {
            name: "Travel and Places",
            emojis: [placeholder],
            groups: ["Travel"],
        },
        { name: "Objects", emojis: [placeholder], groups: ["Object"] },
        { name: "Symbols", emojis: [placeholder], groups: ["Symbol"] },
        {
            name: "Flags and Countries",
            emojis: [placeholder],
            groups: ["Flag", "Country"],
        },
        { name: "Custom", emojis: [placeholder], groups: ["Custom"] },
    ];

    emojis.forEach((e) => {
        const categorie = categories.find((c) => {
            if (c.groups.indexOf(e.category) > -1) {
                return c;
            }
        });

        categorie?.emojis.push({
            alias: e.alias as string | Array<string>,
            unicode: e.unicode,
        });
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

            <div
                className={`${styles.emojisList}`}
                style={style}
                ref={emojiList}
            >
                <div className={styles.inputContainer}>
                    <Image src={Search} alt="search" width={16} height={16} />
                    <input
                        placeholder="Search..."
                        type="text"
                        name="text"
                        id="text"
                        className={styles.input}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.content}>
                    {categories.map((c, k) => {
                        return (
                            <div className={styles.category} key={k}>
                                <p className={styles.categoryName}>{c.name}</p>

                                <div className={styles.emojis}>
                                    {c.emojis.map((e, k) => {
                                        if (search) {
                                            if (Array.isArray(e.alias)) {
                                                e.alias.map((a) => {
                                                    if (
                                                        a
                                                            .toLowerCase()
                                                            .includes(
                                                                search.toLowerCase()
                                                            )
                                                    ) {
                                                        return (
                                                            <Emoji
                                                                key={k}
                                                                unicode={
                                                                    e.unicode
                                                                }
                                                                addEmoji={
                                                                    addEmoji
                                                                }
                                                            />
                                                        );
                                                    }
                                                });
                                            } else {
                                                if (
                                                    e.alias
                                                        .toLowerCase()
                                                        .includes(
                                                            search.toLowerCase()
                                                        )
                                                ) {
                                                    return (
                                                        <Emoji
                                                            key={k}
                                                            unicode={e.unicode}
                                                            addEmoji={addEmoji}
                                                        />
                                                    );
                                                }
                                            }
                                        } else {
                                            return (
                                                <Emoji
                                                    key={k}
                                                    unicode={e.unicode}
                                                    addEmoji={addEmoji}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
