/* eslint-disable @next/next/no-img-element */
import { Messages } from "@prisma/client";
import styles from "./Message.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export async function Message({ message }: { message: Messages }) {
    const messageUser = await prisma.user.findUnique({
        where: { id: message.authorId },
    });

    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email!;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail } })
        .then((user) => user?.id);

    const isYourMessage = message.authorId == currentUserId;

    return (
        <div className={isYourMessage ? styles.yourMessage : styles.hisMessage}>
            <img
                src={messageUser?.userImage!}
                className={styles.userImage}
                alt={`${messageUser?.name}'s pfp`}
            />
            <div className={styles.content}>{message.content}</div>
        </div>
    );
}
