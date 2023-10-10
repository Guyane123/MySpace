import { createContext } from "react";

type conversation = {
    conversaterId: string;
    conversatingId: string;
};

const currentConversation = {
    conversaterId: "you",
    conversatingId: "them",
};
const conversationContext = createContext({
    currentConversation,
    setCurrentConversation: (conversation: conversation) => {},
});

export default conversationContext;
