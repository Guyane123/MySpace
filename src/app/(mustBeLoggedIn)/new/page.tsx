import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewPost from "@/components/NewPost/NewPost";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export default async function New() {
    const session = await getServerSession(authOptions);

    const currentUser = await prisma.user.findUnique({
        where: { email: session?.user?.email! },
    });

    return (
        <NewPost image={currentUser?.image!} username={currentUser?.name!} />
    );
}
