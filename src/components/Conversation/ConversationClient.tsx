/* eslint-disable @next/next/no-img-element */

"use client";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import styles from "./Conversation.module.css";
import { Messages, User } from "@prisma/client";
import conversationContext from "./conversationContext";
import { useSession } from "next-auth/react";
import { ConversationType } from "@/app/types";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

type propsType = {
    conversation: ConversationType;
    conversatingUser: User;
    lastMessage: Messages;
};

export default function ConversationClient({
    conversatingUser,
    conversation,

    lastMessage,
}: propsType) {
    const { setCurrentConversation, currentConversation } =
        useContext(conversationContext);

    return (
        <Link
            href={`/messages/${conversatingUser.id}`}
            className={styles.a}
            onClick={
                () => Notification.requestPermission()
                // wait for permission
            }
        >
            <div className={styles.conversation}>
                <div className={styles.flex}>
                    <img
                        src={
                            conversatingUser?.image ??
                            "https://thispersondoesnotexist.com"
                        }
                        className={styles.conversationPFP}
                        alt={`${conversatingUser?.name}'s pfp`}
                        height="64px"
                        width="64px"
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
                            {lastMessage
                                ? lastMessage.content.length > 40
                                    ? lastMessage.content.slice(0, 40) + "..."
                                    : lastMessage.content
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
