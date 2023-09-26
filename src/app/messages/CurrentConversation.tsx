/* eslint-disable @next/next/no-img-element */
import { SyntheticEvent } from "react";
import { Message } from "../../../components/Message/Message";
import SendMessages from "../../../components/SendMessages/SendMessages";
import { prisma } from "../../../lib/prisma";
import { getCookies } from "./actions";
import styles from "./page.module.css";
import Link from "next/dist/client/link";


export default async function CurrentConversation({}: {}) {
    const { conversaterId, conversatingId } = await getCookies();

    const isOtherUserAlreadyConversating =
        await prisma.conversations.findUnique({
            where: {
                conversatingId_conversaterId: {
                    conversaterId: conversatingId,
                    conversatingId: conversaterId,
                },
            },
        });

    const conversatingUser = await prisma.user.findUnique({
        where: { id: conversatingId! },
    });
    const conversaterUser = await prisma.user.findUnique({
        where: { id: conversaterId },
    });

    let conversationId = conversaterId + conversatingId;
    if (!!isOtherUserAlreadyConversating) {
        conversationId = conversatingId + conversaterId;
    }
    let listOfMessages = await prisma.messages.findMany({
        where: { conversationId: conversationId },
    });

    const messages = [...listOfMessages].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return (
        <div>
            <div className={styles.userHero}>
                <div className={styles.username}>{conversatingUser?.name}</div>
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
                {!!!messages
                    ? "Start writting something..."
                    : messages.map((message, k) => {
                          return <Message key={k} message={message} />;
                      })}
            </div>
            <SendMessages
                isOtherUserAlreadyConversating={
                    !!isOtherUserAlreadyConversating
                }
                conversaterId={conversaterUser?.id!}
                conversatingId={conversatingId!}
            />
        </div>
    );
}
