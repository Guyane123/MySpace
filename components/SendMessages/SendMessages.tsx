"use client";

import styles from "./SendMessages.module.css";
import { sendMessage } from "./actions";
import Image from "next/image";
import sendButton from "../../public/send.svg";

type propsType = {
    conversaterId: string;
    conversatingId: string;
    isOtherUserAlreadyConversating: boolean;
};

function handleSubmit(
    formData: FormData,
    conversatingId: string,
    conversaterId: string,
    isOtherUserAlreadyConversating: boolean
) {
    let conversationId = conversaterId + conversatingId;

    if (isOtherUserAlreadyConversating) {
        conversationId = conversatingId + conversaterId;
    }

    const content = formData.get("text") as string;
    const body = {
        content: content,
        conversationId: conversationId!,
        authorId: conversaterId!,
    };

    if (content) {
        sendMessage(body);
    }
}
export default function SendMessages({
    conversaterId,
    conversatingId,
    isOtherUserAlreadyConversating,
}: propsType) {
    return (
        <>
            <hr />
            <form
                className={styles.form}
                action={(e) =>
                    handleSubmit(
                        e,
                        conversatingId,
                        conversaterId,
                        isOtherUserAlreadyConversating
                    )
                }
            >
                <div className={styles.content}>
                    <input
                        type="text"
                        name="text"
                        placeholder="new message"
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
