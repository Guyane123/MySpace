/* eslint-disable @next/next/no-img-element */

"use client";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { prisma } from "../../lib/prisma";
import styles from "./Conversation.module.css";
import { Messages, User } from "@prisma/client";
import conversationContext from "./conversationContext";
import { setCookies } from "@/app/messages/actions";
import { useSession } from "next-auth/react";

type conversation = {
    conversaterId: string;
    conversatingId: string;
};

type propsType = {
    conversation: conversation;
    conversatingUser: User;
    currentUserId: String;
    lastMessage: Messages;
};

export default function ConversationClient({
    conversatingUser,
    conversation,
    currentUserId,
    lastMessage,
}: propsType) {
    const { setCurrentConversation, currentConversation } =
        useContext(conversationContext);

    return (
        <div
            className={styles.conversation}
            onClick={() => {
                setCurrentConversation(conversation);
                setCookies(
                    currentUserId,
                    conversation.conversaterId == currentUserId
                        ? conversation.conversatingId
                        : conversation.conversaterId
                );
            }}
        >
            <div className={styles.flex}>
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
                <div className={styles.column}>
                    <div className={styles.flex}>
                        <div className={styles.name}>
                            {conversatingUser?.name}
                        </div>
                        <div className={styles.date}>
                            {lastMessage
                                ? lastMessage.createdAt.toLocaleString(
                                      "en-us",
                                      {
                                          day: "numeric",
                                          month: "long",
                                      }
                                  )
                                : ""}
                        </div>
                    </div>
                    <div className={styles.content}>
                        {lastMessage ? lastMessage.content : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}
