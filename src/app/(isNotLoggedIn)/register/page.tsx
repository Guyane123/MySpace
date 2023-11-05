import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Register from "@/components/Register/Register";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function SignInPage() {


    return (
        <div>
            <Register />
        </div>
    );
}
