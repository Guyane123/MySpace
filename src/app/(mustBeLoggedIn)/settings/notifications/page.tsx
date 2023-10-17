import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotificationsForm from "./NotificationsForm";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../lib/prisma";

export default async function notificationsPage() {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const isSetting = await prisma.setting.findUnique({
        where: { userId: currentUserId },
    });

    const setting = isSetting
        ? isSetting
        : await prisma.setting.create({ data: { userId: currentUserId } });

    return <NotificationsForm currentSetting={setting} />;
}
