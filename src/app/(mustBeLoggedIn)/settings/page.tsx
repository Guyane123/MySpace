import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ClickOnSomething } from "./ClickOnSomething";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
    return <ClickOnSomething />;
}
