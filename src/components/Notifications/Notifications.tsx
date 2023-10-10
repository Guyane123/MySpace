import { NotificationType } from "@/app/types";
import styles from "./Notifications.module.css";
import { NotificationModule } from "./Notification";
import { createNotification } from "./actions";

type propsType = {
    notifications: Array<NotificationType>;
};

export async function NotificationsModule({ notifications }: propsType) {
    return (
        <div className={styles.notifications}>
            {notifications.map((notification, k) => {
                return (
                    <NotificationModule notification={notification} key={k} />
                );
            })}
        </div>
    );
}
