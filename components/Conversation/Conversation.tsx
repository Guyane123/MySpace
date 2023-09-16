/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction } from "react";
import { prisma } from "../../lib/prisma";
import styles from "./Conversation.module.css";

type conversation = {
    conversation: {
        conversaterId: string;
        conversatingId: string;
    };

    onConversationChange: any;
};

export default async function Conversations({
    conversation,
    onConversationChange,
}: conversation) {
    const conversatingUser = await prisma.user.findUnique({
        where: { id: conversation.conversatingId },
    });
    const conversaterUser = await prisma.user.findUnique({
        where: { id: conversation.conversaterId },
    });

    return (
        <div
            className={styles.conversation}
            onClick={() =>
                onConversationChange(
                    (currentConversation: conversation) => conversation
                )
            }
        >
            <img
                src={
                    conversatingUser?.image ??
                    "https://thispersondoesnotexist.com"
                }
                className={styles.conversationPFP}
                alt={`${conversatingUser?.name}'s pfp`}
                height="100px"
                width="100px"
            />
            <h1 className={styles.conversationUser}>
                {conversatingUser?.name}
            </h1>
        </div>
    );
}
