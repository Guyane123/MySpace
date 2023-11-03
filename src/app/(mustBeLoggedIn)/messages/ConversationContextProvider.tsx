"use client";

import { useState } from "react";
import conversationContext from "@/components/Conversation/conversationContext";

type propsType = {
    children: React.ReactNode;
    currentUserId: String;
};

type conversation = {
    conversaterId: string;
    conversatingId: string;
};
export default function ConversationContextProvider({
    children,
    currentUserId,
}: propsType) {
    const conversation = {
        conversaterId: "you",
        conversatingId: "them",
    };

    const [currentConversation, setCurrentConversation] =
        useState<conversation>(conversation);


    return (
        <conversationContext.Provider
            value={{ currentConversation, setCurrentConversation }}
        >
            {children}
        </conversationContext.Provider>
    );
}
