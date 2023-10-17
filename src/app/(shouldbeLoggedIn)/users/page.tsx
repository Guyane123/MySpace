import { prisma } from "@/../lib/prisma";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserCard from "@/components/UserCard/UserCard";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Users() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserEmail = session?.user?.email;

    const users = await prisma.user.findMany({
        where: {
            email: {
                not: currentUserEmail,
            },
        },
    });
    return (
        <div className={styles.users}>
            {users.map((user) => {
                return (
                    <UserCard key={user.id} {...user}>
                        <FollowButton targetUserId={user.id!} />
                    </UserCard>
                );
            })}
        </div>
    );
}
