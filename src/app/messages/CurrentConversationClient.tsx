"use client";

import { useContext } from "react";
import conversationContext from "../../../components/Conversation/conversationContext";
import { Messages } from "@prisma/client";

type propsType = {
    children: React.ReactNode;
};
export default function CurrentConservationClient({ children }: propsType) {
    const { currentConversation } = useContext(conversationContext);

    return <div>{children}</div>;
}
