import { ConversationType, MessageType } from "@/app/types";
import ConversationClient from "./ConversationClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

interface conversationWithMessages extends ConversationType {
    messages: Array<MessageType>;
}

type propsType = {
    conversation: conversationWithMessages;
    // onConversationChange: any;
};

export default async function Conversation({ conversation }: propsType) {
    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);

    const conversatingUser = await prisma.user.findUnique({
        where: {
            id:
                conversation.conversaterId == currentUserId
                    ? conversation.conversatingId
                    : conversation.conversaterId,
        },
    });

    return (
        <ConversationClient
            lastMessage={
                conversation.messages[conversation.messages.length - 1]!
            }
            conversation={conversation}
            conversatingUser={conversatingUser!}
        />
    );
}
