import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CheckSession() {
    const currentUser = await fetchCurrentUser();

    if (currentUser?.role == "ADMIN") {
        return true;

        console.log("dsdlgjh");
    }

    return false;
}
