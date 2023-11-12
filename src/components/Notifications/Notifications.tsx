import { NotificationType } from "@/app/types";
import styles from "./Notifications.module.css";
import { NotificationModule } from "./Notification";
import { createNotification } from "../../app/api/createNotification";
import Link from "next/link";

type propsType = {
    notifications: Array<NotificationType>;
};

export async function NotificationsModule({ notifications }: propsType) {
    return (
        <div className={styles.notifications}>
            <Link href="/settings/notifications">Allow push notifications</Link>
            {notifications.map((notification, k) => {
                return (
                    <NotificationModule notification={notification} key={k} />
                );
            })}
        </div>
    );
}
