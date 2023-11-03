import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Register from "@/components/Register/Register";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function SignInPage() {

    try {
        const session = await getServerSession(authOptions);

        if (session) {
            redirect("/");
        }
    } catch {
        console.log("User is not logged in !");
    }

    return (
        <div>
            <Register />
        </div>
    );
}
