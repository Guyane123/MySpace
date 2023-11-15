"use server";

import { prisma } from "../../../lib/prisma";
import fetchCurrentUser from "./fetchCurrentUser";
import { revalidatePath } from "next/cache";

type propsType = {
    name: string;
    bio: string;
    age: number;
    image: string | undefined;
    bannerImageId: string | undefined;
};

export async function updateUser(data: propsType) {
    const currentUser = await fetchCurrentUser();

    let bannerImage = undefined;
    let image = undefined;

    if (data.bannerImageId) {
        bannerImage = await prisma.image.create({
            data: {
                binary: data.bannerImageId!,
                authorId: currentUser?.id!,
                name: "name",
                desc: "desc",
            },
        });
    }
    if (data.image) {
        image = await prisma.image.create({
            data: {
                binary: data.image!,
                authorId: currentUser?.id!,
                name: "name",
                desc: "desc",
            },
        });
    }

    const updatedUser = await prisma.user.update({
        where: { id: currentUser?.id! },
        data: {
            name: data.name,
            bio: data.bio,
            age: data.age,
            image: image?.id,
            bannerImageId: bannerImage?.id,
        },
    });

    revalidatePath("/");
    return updatedUser;
}
