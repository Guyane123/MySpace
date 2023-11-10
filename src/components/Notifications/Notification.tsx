/* eslint-disable @next/next/no-img-element */
import { NotificationType } from "@/app/types";
import styles from "./Notifications.module.css";
import { FollowButton } from "../FollowButton/FollowButton";
import { seeNotification } from "../../app/api/createNotification";
import { prisma } from "../../../lib/prisma";

type propsType = {
    notification: NotificationType;
};

export async function NotificationModule({ notification }: propsType) {
    const otherUser = await prisma.user.findUnique({
        where: { id: notification.notificationAuthorId },
    });
    let content;
    let btn;

    await seeNotification(notification.id);

    const now = new Date();

    const diff = now.getTime() - new Date(notification.createdAt).getTime();

    const durationSeconds = Math.ceil(diff / 1000);
    const durationMinutes = Math.ceil(durationSeconds / 60);

    const durationHours = Math.ceil(
        durationMinutes >= 60 ? durationMinutes / 24 : durationMinutes
    );

    const durationDate = new Date(notification.createdAt).toLocaleDateString(
        "fr",
        {
            day: "numeric",
            month: "long",
        }
    );

    switch (notification.type) {
        case "like":
            content = `${otherUser?.name} liked one of your post.`;
            break;
        case "message":
            content = `${otherUser?.name} sended you a message.`;
            break;
        case "follow":
            content = `${otherUser?.name} started following you.`;
            btn = `${(
                <FollowButton targetUserId={otherUser?.id!}></FollowButton>
            )}`;
            break;
        case "comment":
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
            <p className={styles.content}>
                {content}
                <span className={styles.info}>
                    {" "}
                    {durationSeconds >= 60
                        ? durationMinutes >= 60
                            ? durationHours >= 24
                                ? durationDate
                                : durationHours + "h"
                            : durationMinutes + "min"
                        : durationSeconds + "s"}{" "}
                </span>
            </p>
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
