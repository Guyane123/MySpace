"use server";

import { BinaryLike, createHmac, randomBytes } from "crypto";
import { prisma } from "../../../../../lib/prisma";

const key = process.env.ENCRYPTION_KEY;
export async function hash(string: string) {
    return createHmac("sha256", key as BinaryLike)
        .update(string)
        .digest("hex");
}

export async function createAccount(
    username: string,
    email: string,
    password: string
) {
    const encryptedPassword = await hash(password);

    const newUser = await prisma.user.create({
        data: {
            name: username,
            email: email,
            password: encryptedPassword,
            image: "https://thispersondoesnotexist.com",
        },
    });

    const newAccount = await prisma.account.create({
        data: {
            userId: newUser.id!,
            type: "oauth",
            provider: "credentials",
            providerAccountId: randomBytes(16).toString("hex"),
        },
    });

    return newUser;
}
