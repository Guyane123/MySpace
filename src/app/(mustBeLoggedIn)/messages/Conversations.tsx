"use client";

import { useState } from "react";
import conversationContext from "@/components/Conversation/conversationContext";

type conversation = {
    conversaterId: string;
    conversatingId: string;
};

type propsType = {
    children: React.ReactNode;
    conversations: Array<conversation>;
};

const conversationPlaceholder = {
    conversaterId: "you",
    conversatingId: "them",
};
export function Conversations({ children, conversations }: propsType) {
    const [currentConversation, setCurrentConversation] =
        useState<conversation>(conversationPlaceholder);

    return (
        <conversationContext.Provider
            value={{ currentConversation, setCurrentConversation }}
        >
            {children}
        </conversationContext.Provider>
    );
}
