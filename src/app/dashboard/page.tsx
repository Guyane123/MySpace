import { prisma } from "@/../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ProfileForm";
import styles from "./page.module.css";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentEmail = session?.user?.email!;

    const user = prisma.user.findUnique({ where: { email: currentEmail } });

    return (
        <div>
            <h1 className={styles.title}>Dashboard</h1>
            <ProfileForm user={user} />
        </div>
    );
}
