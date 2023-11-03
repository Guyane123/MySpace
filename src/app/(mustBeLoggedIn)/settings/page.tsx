import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ClickOnSomething } from "./ClickOnSomething";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return <ClickOnSomething />;
}
