import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Messages } from "@prisma/client";
import styles from "./page.module.css";
import ConversationContextProvider from "./ConversationContextProvider";
import Conversation from "@/components/Conversation/Conversation";
import { Conversations } from "./Conversations";
import React from "react";

export default async function Messages() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);

    const conversations = await prisma.conversations.findMany({
        where: {
            OR: [
                {
                    conversatingId: currentUserId,
                },
                {
                    conversaterId: currentUserId,
                },
            ],
        },

        include: {
            messages: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <ConversationContextProvider currentUserId={currentUserId!}>
            <div className={styles.flex}>
                <Conversations conversations={conversations}>
                    <div className={styles.conversations}>
                        {conversations.map((conversation, k) => {
                            return (
                                <Conversation
                                    key={k}
                                    conversation={conversation}
                                ></Conversation>
                            );
                        })}
                    </div>
                </Conversations>
                <div className={styles.currentConversation}>
                    <p>Select a conversation.</p>
                </div>
            </div>
        </ConversationContextProvider>
    );
}
