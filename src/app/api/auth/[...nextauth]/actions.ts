"use server";

import { BinaryLike, createHmac, randomBytes } from "crypto";
import { prisma } from "../../../../../lib/prisma";
import { createImage } from "../../createImage";

const key = process.env.ENCRYPTION_KEY;
export async function hash(string: string) {
    return createHmac("sha256", key as BinaryLike)
        .update(string)
        .digest("hex");
}

// export async function storeSensitiveCookie(name: string, value: string) {
//     const encryptedValue = await hash(value);

// }

export async function createAccount(
    username: string,
    email: string,
    password: string
) {
    const encryptedPassword = await hash(password);

    // const newImage = await prisma.image.create({
    //     data: {
    //         binary: "https://thispersondoesnotexist.com",
    //         name: "name",
    //         desc: "desc",
    //     },
    // });
    // const newBannerImage = await prisma.image.create({
    //     data: {
    //         binary: "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
    //         name: "name",
    //         desc: "desc",
    //     },
    // });
    const newUser = await prisma.user.create({
        data: {
            name: username,
            email: email,
            password: encryptedPassword,
        },
    });

    const newSetting = await prisma.setting.create({
        data: {
            userId: newUser.id,
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
