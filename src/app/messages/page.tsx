import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import styles from "./page.module.css";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Conversation from "../../../components/Conversation/Conversation";
import { Conversations } from "./Conversations";
import ConversationContextProvider from "./ConversationContextProvider";
import CurrentConversation from "./CurrentConversation";
import { redirect } from "next/navigation";
import { setCookies } from "./actions";

export default async function Messages() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);
    const conversationsCreatedByUser = await prisma.conversations.findMany({
        where: { conversaterId: currentUserId },
    });

    const conversationsCreatedByOtherUser = await prisma.conversations.findMany(
        { where: { conversatingId: currentUserId } }
    );

    const conversations = conversationsCreatedByUser.concat(
        conversationsCreatedByOtherUser
    );

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
                <div className={styles.currentConversation}>
                    <CurrentConversation />
                </div>
            </div>
        </ConversationContextProvider>
    );
}
