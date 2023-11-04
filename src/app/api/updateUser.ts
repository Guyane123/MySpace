"use server";

import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";

type propsType = {
    name: string;
    bio: string;
    age: number;
    image: string;
    bannerImage: string;
};

export async function updateUser(data: propsType) {
    const currentUser = await fetchCurrentUser();

    const updatedUser = await prisma.user.update({
        where: { id: currentUser?.id },
        data: data,
    });

    return updatedUser;
}
