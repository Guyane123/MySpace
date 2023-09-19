"use client";

import { Conversations } from "@prisma/client";
import { useEffect, useState } from "react";
import conversationContext from "../../../components/Conversation/conversationContext";
import { getCookies, setCookies } from "./actions";

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

    // useEffect(() => {
    //     setCurrentConversation((conversation) => conversation);
    // }, []);

    if (
        currentConversation.conversaterId !== "you" ||
        currentConversation.conversatingId !== "them"
    ) {
        setCookies(
            currentConversation.conversaterId,
            currentConversation.conversatingId
        );
    }

    return (
        <conversationContext.Provider
            value={{ currentConversation, setCurrentConversation }}
        >
            {children}
        </conversationContext.Provider>
    );
}
