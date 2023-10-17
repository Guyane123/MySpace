"use client";

import { useEffect, useState } from "react";
import { User } from ".prisma/client";
import { createContext } from "vm";
import conversationContext from "@/components/Conversation/conversationContext";
import { setCookies } from "./actions";

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
