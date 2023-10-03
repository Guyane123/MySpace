import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import styles from "./page.module.css";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Conversation from "../../../components/Conversation/Conversation";
import ConversationContextProvider from "./ConversationContextProvider";
import CurrentConversation from "./[id]/page";
import { redirect } from "next/navigation";
import { Conversations } from "./Conversations";
import { Messages } from "@prisma/client";

export default async function Messages() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);
    const conversations = await prisma.conversations.findMany({
        where: {
            conversaterId: currentUserId,
            OR: [
                {
                    conversatingId: currentUserId,
                },
            ],
        },

        include: {
            messages: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return <h1>Please select a conversation.</h1>;
}
