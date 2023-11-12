"use server";

import fetchSaveSubscribtion from "./fetchSaveSubscribtion";
import webpush from "web-push";

export default async function createPushNotification(targetId: string) {
    const vapidKeys = {
        publicKey: process.env.PUSHPUBLICKEY!,
        privateKey: process.env.PUSHPRIVATEKEY!,
    };

    webpush.setVapidDetails(
        "mailto:https://pink-berries-i9hk.vercel.app",
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );
    const subscription = await fetchSaveSubscribtion(targetId as string);

    const formattedSubscribtion = {
        keys: {
            p256dh: String(new Uint8Array(subscription.p256dhKey)),
            auth: String(new Uint8Array(subscription.authKey)),
        },
        endpoint: subscription.endpoint,
    };

    const options = {
        vapidDetails: {
            subject: "mailto:https://pink-berries-i9hk.vercel.app",
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey,
        },
        headers: {
            PinkberriesHeader: "PinkberriesHeaders",
        },
        topic: "PinkberriesTopic",
    };

    webpush.sendNotification(
        formattedSubscribtion,
        "PinkberriesPayLoad",
        options
    );

    console.log("Sended notification");
}
