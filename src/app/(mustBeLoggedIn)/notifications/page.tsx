import { getServerSession } from "next-auth";
import { fetchNotifications } from "../../api/notifications";
import { NotificationsModule } from "@/components/Notifications/Notifications";
import { prisma } from "../../../../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Notifications() {
    const notifications = await fetchNotifications();

    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    return (
        <div>
            <NotificationsModule notifications={notifications!} />
        </div>
    );
}
