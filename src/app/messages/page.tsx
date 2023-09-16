import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import style from "./page.module.css";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Conversation from "../../../components/Conversation/Conversation";
import { Conversations } from "./Conversations";

export default async function Messages() {
    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);
    const conversations = await prisma.conversations.findMany({
        where: { conversaterId: currentUserId },
    });

    console.log(conversations.length);
    return (
        <div>
            <Conversations conversations={conversations}></Conversations>
        </div>
    );
}
