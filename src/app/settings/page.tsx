import { prisma } from "@/../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ProfileForm } from "./account/ProfileForm";
import styles from "./page.module.css";
import Setting from "../../../components/Settings/Setting";
import Settings from "../../../components/Settings/Settings";
import { ClickOnSomething } from "./ClickOnSomething";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return <ClickOnSomething />;
}
