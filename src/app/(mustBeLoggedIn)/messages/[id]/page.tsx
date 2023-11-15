/* eslint-disable @next/next/no-img-element */
import { Message } from "@/components/Message/Message";
import SendMessages from "@/components/SendMessages/SendMessages";
import styles from "./page.module.css";
import Link from "next/dist/client/link";
import { fetchConversation } from "../../../api/cookie";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConversationContextProvider from "../ConversationContextProvider";
import { Conversations } from "../Conversations";
import Conversation from "@/components/Conversation/Conversation";
import { MessageType } from "@/app/types";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { fetchConversations } from "@/app/api/fetchConversations";
import Messages from "@/components/Messages/Messages";

type propsType = {
    params: {
        id: String;
    };
};
export default async function CurrentConversation({ params }: propsType) {
    const conversatingId = params.id;

    let conversation = await fetchConversation(conversatingId as string);

    setInterval(
        async () =>
            (conversation = await fetchConversation(conversatingId as string)),
        1000
    );

    const currentUser = await fetchCurrentUser();

    if (!conversation) {
        redirect("/404");
    }

    const conversatingUser = await fetchCurrentUser(params.id as string);
    const conversaterUser = await fetchCurrentUser(currentUser?.id);

    const conversations = await fetchConversations();

    return (
        <>
            <ConversationContextProvider currentUserId={currentUser?.id!}>
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
                        </div>
                        <hr className={styles.hr} />
                        <Messages>
                            {!!!conversation?.messages
                                ? "Start writting something..."
                                : conversation.messages.map(
                                      (message: MessageType, k: number) => {
                                          return (
                                              <Message
                                                  key={k}
                                                  message={message}
                                              />
                                          );
                                      }
                                  )}
                            <div className={styles.userHero}>
                                <Link href={`/users/${conversaterUser?.id}`}>
                                    <div className={styles.bottom}>
                                        <img
                                            src={
                                                conversatingUser?.userImage
                                                    ? conversatingUser
                                                          ?.userImage.binary!
                                                    : "https://thispersondoesnotexist.com"
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
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Messages>
                        <SendMessages
                            conversaterId={currentUser?.id!}
                            conversatingId={conversatingId as string}
                            style={{ top: "-1200%" }}
                        />
                    </div>
                </div>
            </ConversationContextProvider>
        </>
    );
}
