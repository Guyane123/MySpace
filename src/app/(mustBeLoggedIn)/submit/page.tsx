import { getServerSession } from "next-auth";
import NewPost from "@/components/NewPost/NewPost";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

export default async function Submit() {
    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email;

    const currentUser = await prisma.user.findUnique({
        where: { email: currentUserEmail! },
    });

    return (
        <div>
            <NewPost
                image={currentUser?.image!}
                username={currentUser?.name!}
            />
        </div>
    );
}
