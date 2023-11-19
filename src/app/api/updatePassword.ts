"use server";

import { prisma } from "../../../lib/prisma";
import { encrypt } from "../../../lib/encrypt";
import { revalidatePath } from "next/cache";

type propsType = {
    password: string;
};

export async function updatePassword(password: string, email: string) {
    const hashedPassword = await encrypt.hash(password);

    const updatedUser = await prisma.user.update({
        where: { email: email },
        data: {
            password: hashedPassword,
        },
    });

    revalidatePath("/");
    return updatedUser;
}
