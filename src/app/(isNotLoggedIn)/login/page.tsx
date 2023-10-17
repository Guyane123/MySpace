import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Login from "@/components/Login/Login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function SignInPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    return (
        <div>
            <Login />
        </div>
    );
}
