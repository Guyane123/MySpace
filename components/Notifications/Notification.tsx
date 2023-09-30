/* eslint-disable @next/next/no-img-element */
import { NotificationType } from "@/app/types";
import styles from "./Notifications.module.css";
import { prisma } from "../../lib/prisma";
import { FollowButton } from "../FollowButton/FollowButton";

type propsType = {
    notification: NotificationType;
};

export async function NotificationModule({ notification }: propsType) {
    let otherUser;
    let content;
    let btn;

    switch (notification.content) {
        case "like":
            otherUser = await prisma.user.findUnique({
                where: { id: notification.likerId! },
            });
            content = `${otherUser?.name} liked one of your post.`;
            break;
        case "message":
            otherUser = await prisma.user.findUnique({
                where: { id: notification.conversaterId! },
            });
            content = `${otherUser?.name} sended you a message.`;
            break;
        case "follow":
            otherUser = await prisma.user.findUnique({
                where: { id: notification.followerId! },
            });
            content = `${otherUser?.name} started following you.`;
            btn = `${(
                <FollowButton targetUserId={otherUser?.id!}></FollowButton>
            )}`;
            break;
        case "comment":
            otherUser = await prisma.user.findUnique({
                where: { id: notification.commenterId! },
            });
            content = `${otherUser?.name} commented one of your post.`;
            break;
        default:
            throw new Error("error this type of notification does not exist.");
    }

    return (
        <div className={styles.notification}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={
                        otherUser?.image
                            ? otherUser.image
                            : "https://thispersondoesnotexist.com/sjghg"
                    }
                    alt={`${otherUser?.name}'s pfp`}
                />
            </div>
            <div className={styles.content}>{content}</div>
            {btn ? (
                <div className={styles.btn}>
                    {
                        <FollowButton
                            targetUserId={otherUser?.id!}
                        ></FollowButton>
                    }
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
