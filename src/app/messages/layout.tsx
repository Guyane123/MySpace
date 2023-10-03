import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import styles from "./page.module.css";
import ConversationContextProvider from "./ConversationContextProvider";
import { Conversations } from "./Conversations";
import Conversation from "../../../components/Conversation/Conversation";
import { Children } from "react";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);
    const conversationsUserConversater = await prisma.conversations.findMany({
        where: {
            conversaterId: currentUserId,
        },

        include: {
            messages: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    const conversationUserConversating = await prisma.conversations.findMany({
        where: { conversatingId: currentUserId },
        include: { messages: true },
    });

    const conversations = conversationUserConversating.concat(
        conversationsUserConversater
    );

    console.log(conversations);

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
                <div className={styles.currentConversation}>{children}</div>
            </div>
        </ConversationContextProvider>
    );
}
