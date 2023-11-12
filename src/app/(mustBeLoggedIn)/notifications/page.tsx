import { fetchNotifications } from "@/app/api/notifications";
import { NotificationsModule } from "@/components/Notifications/Notifications";
import { useEffect } from "react";

export default async function Notifications() {
    const notifications = await fetchNotifications();


    return (
        <div>
            <NotificationsModule notifications={notifications!} />
        </div>
    );
}
