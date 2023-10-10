/* eslint-disable @next/next/no-img-element */
import { SyntheticEvent } from "react";
import { Message } from "@/components/Message/Message";
import SendMessages from "@/components/SendMessages/SendMessages";
import { prisma } from "../../../../lib/prisma";
import styles from "./page.module.css";
import Link from "next/dist/client/link";
import { fetchConversation } from "../actions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConversationContextProvider from "../ConversationContextProvider";
import { Conversations } from "../Conversations";
import Conversation from "@/components/Conversation/Conversation";

type propsType = {
    params: {
        id: String;
    };
};
export default async function CurrentConversation({ params }: propsType) {
    const conversatingId = params.id;

    const session = await getServerSession(authOptions);
    const conversation = await fetchConversation(conversatingId as string);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    if (!conversation) {
        redirect("/404");
    }

    const conversatingUser = await prisma.user.findUnique({
        where: { id: params.id as string },
    });
    const conversaterUser = await prisma.user.findUnique({
        where: { id: currentUserId },
    });

    const conversations = await prisma.conversations.findMany({
        where: {
            OR: [
                {
                    conversatingId: currentUserId,
                },
                {
                    conversaterId: currentUserId,
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

    return (
        <>
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
                    <div className={styles.conversation}>
                        <div className={styles.userHero}>
                            <div className={styles.username}>
                                <Link href={"/messages"}>&#8592; Go back</Link>
                            </div>
                            <Link href={`/users/${conversaterUser?.id}`}>
                                <div className={styles.bottom}>
                                    <img
                                        src={
                                            conversatingUser?.image ??
                                            conversatingUser?.image!
                                        }
                                        alt={`${conversatingUser?.name}'s pfp`}
                                        width={98}
                                        height={98}
                                        className={styles.otherUserImg}
                                    />
                                    <div className={styles.username}>
                                        {conversatingUser?.name}
                                    </div>
                                    <div className={styles.info}>
                                        Joined PinkBerries on
                                        {conversatingUser?.createdAt.toLocaleDateString(
                                            "en-us",
                                            { month: "long", year: "numeric" }
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <hr className={styles.hr} />
                        <div className={styles.messages}>
                            {!!!conversation?.messages
                                ? "Start writting something..."
                                : conversation.messages.map((message, k) => {
                                      return (
                                          <Message key={k} message={message} />
                                      );
                                  })}
                        </div>
                        <SendMessages
                            conversaterId={currentUserId}
                            conversatingId={conversatingId as string}
                        />
                    </div>
                </div>
            </ConversationContextProvider>
        </>
    );
}
