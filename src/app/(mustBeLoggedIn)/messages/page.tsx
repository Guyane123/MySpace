import styles from "./page.module.css";
import ConversationContextProvider from "./ConversationContextProvider";
import Conversation from "@/components/Conversation/Conversation";
import { Conversations } from "./Conversations";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { fetchConversations } from "@/app/api/fetchConversations";

export default async function Messages() {
    const currentUser = await fetchCurrentUser();
    const conversations = await fetchConversations();


    return (
        <ConversationContextProvider currentUserId={currentUser?.id!}>
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
