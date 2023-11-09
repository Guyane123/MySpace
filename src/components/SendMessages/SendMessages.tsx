"use client";

import styles from "./SendMessages.module.css";
import { sendMessage } from "./actions";
import Image from "next/image";
import sendButton from "@/../public/send.svg";
import React, { useRef, useState } from "react";

type propsType = {
    conversaterId: string;
    conversatingId: string;
};

export default function SendMessages({
    conversaterId,
    conversatingId,
}: propsType) {
    const ref = useRef<HTMLInputElement | null>(null);

    const [value, setValue] = useState<string>("");
    function handleSubmit(
        e: React.FormEvent,
        conversatingId: string,
        conversaterId: string
    ) {
        e.preventDefault();
        let conversationId = conversaterId + conversatingId;

        const body = {
            content: value,
            conversaterId: conversaterId,
            conversatingId: conversatingId,
            authorId: conversaterId!,
        };

        if (value) {
            sendMessage(value, conversatingId);
        }

        setValue("");
    }

    return (
        <>
            <hr />
            <form
                className={styles.form}
                onSubmit={(e) => handleSubmit(e, conversatingId, conversaterId)}
            >
                <div className={styles.content}>
                    <input
                        ref={ref}
                        type="text"
                        name="text"
                        placeholder="new message"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.btn}>
                        <Image
                            height={32}
                            width={32}
                            src={sendButton}
                            alt="send btn"
                        />
                    </button>
                </div>
            </form>
        </>
    );
}
