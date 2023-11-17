"use server";

import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";
import { revalidatePath } from "next/cache";

type propsType = {
    name: string;
    bio: string;
    age: number;
    image: string | undefined;
    bannerImage: string | undefined;
};

export async function updateUser(data: propsType) {
    const currentUser = await fetchCurrentUser();

    const updatedUser = await prisma.user.update({
        where: { id: currentUser?.id! },
        data: data,
    });

    revalidatePath("/");
    return updatedUser;
}
