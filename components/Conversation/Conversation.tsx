import { Conversations } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import ConversationClient from "./ConversationClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type propsType = {
    conversation: Conversations;
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
    const conversaterUser = await prisma.user.findUnique({
        where: { id: currentUserId },
    });

    return (
        <ConversationClient
            conversation={conversation}
            currentUserId={currentUserId!}
            conversatingUser={conversatingUser!}
        />
    );
}
